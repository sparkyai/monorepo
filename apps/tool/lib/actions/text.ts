"use server";

import prisma from "@lib/utils/prisma";

export type TextTemplate = {
  name: string;
  category: number;
  language: number;
  parameters?: {
    model?: string;
    top_p?: number;
    temperature?: number;
    present_penalty?: number;
    frequency_penalty?: number;
  };
};

export async function createTextTemplate(data: TextTemplate) {
  return prisma.text_templates.create({
    data: {
      name: data.name.trim(),
      category: {
        connect: {
          id: data.category,
        },
      },
      language: {
        connect: {
          id: data.language,
        },
      },
      parameters: {
        create: data.parameters || {},
      },
      // poster?: imagesCreateNestedOneWithoutChat_rolesInput
      // description?: string | null
    },
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
  });
}

export async function updateTextTemplate(id: number, data: Partial<TextTemplate>) {
  await prisma.text_templates.update({
    data: {
      name: data.name?.trim(),
      category: data.category
        ? {
            connect: {
              id: data.category,
            },
          }
        : void 0,
      language: data.language
        ? {
            connect: {
              id: data.language,
            },
          }
        : void 0,
      parameters: data.parameters
        ? {
            update: data.parameters,
          }
        : void 0,
    },
    where: { id },
    select: { id: true },
  });
}

export async function deleteTextTemplate(id: number) {
  await prisma.$transaction(async () => {
    await prisma.interactions.deleteMany({
      where: {
        text_templates: {
          every: { id },
        },
      },
    });

    await prisma.gpt_messages.deleteMany({
      where: {
        text_templates: {
          every: { id },
        },
      },
    });

    await prisma.gpt_chat_parameters.deleteMany({
      where: {
        text_templates: { id },
      },
    });
  });
}

export type TextTemplateMessage = {
  role: string;
  content: string;
};

export async function createTextTemplateMessage(templateId: number, data: TextTemplateMessage) {
  return prisma.gpt_messages.create({
    data: {
      ...data,
      text_templates: {
        connect: {
          id: templateId,
        },
      },
    },
    select: {
      id: true,
      role: true,
      content: true,
    },
  });
}

export async function updateTextTemplateMessage(id: bigint, data: Partial<TextTemplateMessage>) {
  await prisma.gpt_messages.update({
    data,
    where: { id },
    select: { id: true },
  });
}

export async function deleteTextTemplateMessage(id: bigint) {
  await prisma.gpt_messages.delete({
    where: { id },
    select: { id: true },
  });
}

export type TextCategory = {
  name: string;
  language: number;
};

export async function createTextCategory(data: TextCategory) {
  return prisma.text_categories.create({
    data: {
      name: data.name.trim(),
      language: {
        connect: {
          id: data.language,
        },
      },
    },
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
  });
}

export async function updateTextCategory(id: number, data: Partial<TextCategory>) {
  await prisma.text_categories.update({
    data: {
      name: data.name?.trim(),
      language: data.language
        ? {
            connect: {
              id: data.language,
            },
          }
        : void 0,
    },
    where: { id },
    select: { id: true },
  });
}

export async function deleteTextCategory(id: number) {
  await prisma.$transaction(async () => {
    await prisma.interactions.deleteMany({
      where: {
        text_templates: {
          every: {
            category: { id },
          },
        },
      },
    });

    await prisma.gpt_messages.deleteMany({
      where: {
        text_templates: {
          every: {
            category: { id },
          },
        },
      },
    });

    await prisma.gpt_chat_parameters.deleteMany({
      where: {
        text_templates: {
          category: { id },
        },
      },
    });

    await prisma.text_categories.delete({
      where: { id },
      select: { id: true },
    });
  });
}
