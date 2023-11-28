import prisma from "@lib/utils/prisma";

type Subscription = {
  tokens: bigint | null;
  started_at: Date | null;
  expired_at: Date | null;
};

type Usage = {
  tokens: bigint;
};

export async function getUserSubscriptionBalance(id: number | bigint) {
  const subscriptions = await prisma.$queryRaw<Subscription[]>`
      SELECT sum(coalesce(p.tokens, 0)) as tokens, min(p.updated_at) as started_at, max(p.expired_at) as expired_at
      FROM public.payments p
      WHERE p.user_id = ${id}
        AND p.expired_at >= now();
  `;

  if (!subscriptions[0].tokens) {
    return 0;
  }

  const usage = await prisma.$queryRaw<Usage[]>`
      SELECT *
      FROM (SELECT coalesce(sum(cu.completion_tokens), 0) as tokens
            FROM public.chat_role_usage cu
            WHERE cu.user_id = ${id}
              AND cu.created_at BETWEEN ${subscriptions[0].started_at} AND ${subscriptions[0].expired_at}
            UNION ALL
            SELECT coalesce(sum(tu.completion_tokens), 0) as tokens
            FROM public.text_template_usage tu
            WHERE tu.user_id = ${id}
              AND tu.created_at BETWEEN ${subscriptions[0].started_at} AND ${subscriptions[0].expired_at}
            UNION ALL
            SELECT coalesce(sum(iu.tokens), 0) as tokens
            FROM public.image_template_usage iu
            WHERE iu.user_id = ${id}
              AND iu.created_at BETWEEN ${subscriptions[0].started_at} AND ${subscriptions[0].expired_at}) usage
  `;

  return Number(subscriptions[0].tokens) - usage.reduce((balance, item) => balance + Number(item.tokens), 0);
}

export async function updateUserExtraTokens(id: number | bigint, tokens: number) {
  const balance = (await getUserSubscriptionBalance(id)) - tokens;

  if (balance < 0) {
    await prisma.telegram_users.update({
      data: {
        extra_tokens: { increment: balance },
      },
      where: { id },
      select: { id: true },
    });
  }
}
