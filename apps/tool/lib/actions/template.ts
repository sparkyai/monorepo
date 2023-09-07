"use server";

import prisma from "@lib/utils/prisma";
import { getTemplate } from "@lib/utils/data";

export async function createTemplate() {
  return prisma.template.create({
    data: {
      name: "Untitled",
    },
    select: {
      id: true,
    },
  });
}

export async function deleteTemplate(id: number) {
  return prisma.template.delete({
    where: { id },
  });
}

type TemplateMessage = {
  id?: string;
  role: string;
  content: string;
  position: number;
};

export type TemplateData = {
  name?: string;
  topP?: number;
  model?: string;
  context?: Partial<Omit<TemplateMessage, "id">>[];
  category?: string | number;
  parameters?: unknown[];
  temperature?: number;
  presentPenalty?: number;
  frequencyPenalty?: number;
};

export async function updateTemplate(id: number, data: Omit<TemplateData, "context">) {
  let category;

  if (data.category) {
    if (typeof data.category === "number") {
      category = {
        connect: [data.category],
      };
    } else {
      category = {
        connectOrCreate: {
          where: {
            name: data.category,
          },
          create: {
            name: data.category,
          },
        },
      };
    }
  }

  return prisma.template.update({
    where: { id },
    data: {
      name: data.name,
      topP: data.topP,
      model: data.model,
      category,
      temperature: data.temperature,
      presentPenalty: data.presentPenalty,
      frequencyPenalty: data.frequencyPenalty,
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
    .filter((message) => {
      if (
        deleteMany.every((item) => item.id !== message.id) &&
        createMany.every((item) => item.position !== message.position)
      ) {
        return (
          JSON.stringify(template.context.find((oldMessage) => oldMessage.id === message.id)) !==
          JSON.stringify({
            id: message.id,
            role: message.role,
            content: message.content,
            position: message.position,
          })
        );
      }

      return false;
    })
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
    (await prisma.template.update({
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
