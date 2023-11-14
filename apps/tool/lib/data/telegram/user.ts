import prisma from "@lib/utils/prisma";

export async function getUserTokenBalance(id: bigint) {
  const user = await prisma.telegram_users.findUniqueOrThrow({
    where: { id },
    select: {
      payments: {
        take: 1,
        where: { expired_at: { gte: new Date() } },
        select: {
          tokens: true,
          updated_at: true,
          expired_at: true,
        },
        orderBy: { expired_at: "desc" },
      },
      extra_tokens: true,
    },
  });

  let tokens = user.extra_tokens;

  if (user.payments.length) {
    const [payment] = user.payments;

    if (payment.expired_at) {
      const [chat, text, image] = await Promise.all([
        prisma.chat_role_usage.aggregate({
          _sum: { prompt_tokens: true, completion_tokens: true },
          where: {
            user: { id },
            created_at: {
              lte: payment.expired_at,
              gte: payment.updated_at,
            },
          },
        }),
        prisma.text_template_usage.aggregate({
          _sum: { prompt_tokens: true, completion_tokens: true },
          where: {
            user: { id },
            created_at: {
              lte: payment.expired_at,
              gte: payment.updated_at,
            },
          },
        }),
        prisma.image_template_usage.aggregate({
          _sum: { tokens: true },
          where: {
            user: { id },
            created_at: {
              lte: payment.expired_at,
              gte: payment.updated_at,
            },
          },
        }),
      ]);

      tokens +=
        payment.tokens -
        (chat._sum.prompt_tokens || 0) -
        (chat._sum.completion_tokens || 0) -
        (text._sum.prompt_tokens || 0) -
        (text._sum.completion_tokens || 0) -
        (image._sum.tokens || 0);
    }
  }

  return tokens;
}
