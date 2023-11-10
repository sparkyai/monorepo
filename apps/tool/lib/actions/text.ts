"use server";

import prisma from "@lib/utils/prisma";
import { deleteObject } from "@lib/utils/s3";

function getTemplatePosterKey(id: number) {
  return `text-template-${id}-poster`;
}

export type TextTemplate = {
  name: string;
  poster?: null | File;
  category: number;
  language: number;
  parameters?: {
    model?: string;
    top_p?: number;
    temperature?: number;
    present_penalty?: number;
    frequency_penalty?: number;
  };
  description?: string;
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
      description: data.description?.trim(),
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
      description: data.description?.trim(),
    },
    where: { id },
    select: { id: true },
  });
}

export async function updateTextTemplatePoster(id: number, data: FormData) {
  if (data.has("poster")) {
    // const url = await uploadObject(getTemplatePosterKey(id), data.get("poster") as File);

    await prisma.text_templates.update({
      data: {
        // poster: {
        //   create: {
        //     url,
        //   },
        // },
      },
      where: { id },
      select: { id: true },
    });
  } else {
    const poster = await prisma.text_templates.findUniqueOrThrow({ where: { id } }).poster({
      select: {
        id: true,
        // url: true,
      },
    });

    if (poster) {
      await prisma.images.delete({
        where: { id: poster.id },
        select: { id: true },
      });

      await deleteObject(getTemplatePosterKey(id));
    }
  }
}

export async function deleteTextTemplate(id: number) {
  const template = await prisma.text_templates.delete({
    where: { id },
    select: {
      poster: {
        select: {
          id: true,
        },
      },
    },
  });

  if (template.poster) {
    await Promise.all([
      deleteObject(getTemplatePosterKey(id)),
      prisma.images.delete({
        where: { id: template.poster.id },
        select: { id: true },
      }),
    ]);
  }
}

export type TextTemplateMessage = {
  role: string;
  content: string;
};

export async function createTextTemplateMessage(templateId: number, data: TextTemplateMessage) {
  return prisma.text_template_messages.create({
    data: {
      ...data,
      template: {
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
  await prisma.text_template_messages.update({
    data,
    where: { id },
    select: { id: true },
  });
}

export async function deleteTextTemplateMessage(id: bigint) {
  await prisma.text_template_messages.delete({
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
  await prisma.text_categories.delete({
    where: { id },
    select: { id: true },
  });
}
