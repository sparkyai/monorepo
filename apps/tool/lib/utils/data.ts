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
