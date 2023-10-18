"use server";

import { getTemplate } from "@lib/utils/data";
import prisma from "@lib/utils/prisma";

type RequiredExclude<T, K extends keyof T> = Required<Omit<T, K>> & Pick<T, K>;

export async function createTemplate(name: string, category: number, language: number) {
  return prisma.templates.create({
    data: {
      name,
      category: {
        connect: {
          id: category,
        },
      },
      language: {
        connect: {
          id: language,
        },
      },
    },
    select: {
      id: true,
    },
  });
}

export async function deleteTemplate(id: number) {
  return prisma.templates.delete({
    where: { id },
  });
}

type TemplateMessage = {
  id?: number;
  role: string;
  content: string;
};

export type TemplateData = {
  name?: string;
  topP?: number;
  model?: string;
  context?: Partial<Omit<TemplateMessage, "id">>[];
  category?: number;
  language?: number;
  temperature?: number;
  presentPenalty?: number;
  frequencyPenalty?: number;
};

export async function updateTemplate(id: number, data: Omit<TemplateData, "context">) {
  return prisma.templates.update({
    where: { id },
    data: {
      name: data.name,
      top_p: data.topP,
      model: data.model,
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
      temperature: data.temperature,
      present_penalty: data.presentPenalty,
      frequency_penalty: data.frequencyPenalty,
    },
  });
}

export async function updateTemplateContext(id: number, data: TemplateMessage[]) {
  const template = await getTemplate(id, true);

  const deleteMany = template.context
    .filter((message) => !data.some((item) => item.id === message.id))
    .map((message) => ({ id: message.id }));

  const createMany = data.filter((message) => !message.id);

  const updateMany = data
    .filter((message) => message.id)
    .map((message) => ({
      where: {
        id: message.id,
      },
      data: message,
    }));

  const created = createMany.length;
  const updated = updateMany.length;
  const deleted = deleteMany.length;

  created + updated + deleted &&
    (await prisma.templates.update({
      where: { id },
      data: {
        context: {
          updateMany,
          deleteMany,
          createMany: {
            data: createMany,
          },
        },
      },
    }));

  return { created, updated, deleted };
}

type ImageTemplateData = {
  name?: string;
  model?: string;
  provider?: string;
  language?: number;
};

export async function createImageTemplate(data: RequiredExclude<ImageTemplateData, "model">) {
  return prisma.image_templates.create({
    data: {
      ...data,
      language: {
        connect: {
          id: data.language,
        },
      },
    },
  });
}

export async function deleteImageTemplate(id: number) {
  return prisma.image_templates.delete({
    where: { id },
  });
}

export async function updateImageTemplate(id: number, data: ImageTemplateData) {
  return prisma.image_templates.update({
    where: { id },
    data: {
      ...data,
      language: data.language
        ? {
            connect: {
              id: data.language,
            },
          }
        : void 0,
    },
  });
}
