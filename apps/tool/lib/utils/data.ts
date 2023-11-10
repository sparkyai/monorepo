import prisma from "@lib/utils/prisma";

function getCursor<T>(id?: T) {
  return id ? { id } : void 0;
}

export async function getLanguageCollection() {
  return prisma.languages.findMany({
    orderBy: {
      code: "asc",
    },
  });
}

export async function getChatRole(id: number) {
  return prisma.chat_roles.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      name: true,
      poster: true,
      prompt: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      language: true,
      parameters: {
        select: {
          model: true,
          top_p: true,
          temperature: true,
          present_penalty: true,
          frequency_penalty: true,
        },
      },
      description: true,
    },
  });
}

export async function getChatRoleCollection(cursor?: number) {
  return prisma.chat_roles.findMany({
    cursor: getCursor(cursor),
    select: {
      id: true,
      name: true,
      poster: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      language: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function getChatCategoryCollection(cursor?: number) {
  return prisma.chat_categories.findMany({
    cursor: getCursor(cursor),
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          roles: true,
        },
      },
      language: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function getTextTemplate(id: number) {
  return prisma.text_templates.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      name: true,
      poster: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      language: true,
      messages: {
        select: {
          id: true,
          role: true,
          content: true,
        },
      },
      parameters: {
        select: {
          model: true,
          top_p: true,
          temperature: true,
          present_penalty: true,
          frequency_penalty: true,
        },
      },
      description: true,
    },
  });
}

export async function getTextTemplateCollection(cursor?: number) {
  return prisma.text_templates.findMany({
    cursor: getCursor(cursor),
    select: {
      id: true,
      name: true,
      poster: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      language: true,
      description: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function getTextTemplateMessagesCollection(templateId: number, cursor?: number) {
  return prisma.text_templates.findUniqueOrThrow({ where: { id: templateId } }).messages({
    cursor: getCursor(cursor),
    select: {
      id: true,
      role: true,
      content: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function getTextCategoryCollection(cursor?: number) {
  return prisma.text_categories.findMany({
    cursor: getCursor(cursor),
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          templates: true,
        },
      },
      language: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function getImageTemplateCollection(cursor?: number) {
  return prisma.image_templates.findMany({
    cursor: getCursor(cursor),
    select: {
      id: true,
      name: true,
      model: true,
      poster: true,
      provider: true,
      language: true,
      description: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}

export function getPosterUrl(pathname: string) {
  return `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com${pathname}`;
}

export async function getTokenBalance(id: bigint | number) {
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
