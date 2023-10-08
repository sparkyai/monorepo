"use server";

import prisma from "@lib/utils/prisma";
import { getTemplate } from "@lib/utils/data";

export async function createTemplate(name: string, category: number | string, language: number) {
  return prisma.template.create({
    data: {
      name,
      category:
        typeof category === "number"
          ? {
              connect: {
                id: category,
              },
            }
          : {
              connectOrCreate: {
                where: {
                  name: category,
                },
                create: {
                  name: category,
                  language: {
                    connect: {
                      id: language,
                    },
                  },
                },
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
  return prisma.template.delete({
    where: { id },
  });
}

type TemplateMessage = {
  id?: number;
  role: string;
  content: string;
  position: number;
};

export type TemplateData = {
  name?: string;
  topP?: number;
  model?: string;
  context?: Partial<Omit<TemplateMessage, "id">>[];
  category?: null | string | number;
  language?: number;
  temperature?: number;
  presentPenalty?: number;
  frequencyPenalty?: number;
};

export async function updateTemplate(id: number, data: Omit<TemplateData, "context">) {
  let category;

  if (data.category === null) {
    category = {
      disconnect: true,
    };
  } else if (typeof data.category === "number") {
    category = {
      connect: {
        id: data.category,
      },
    };
  } else if (data.category) {
    category = {
      connectOrCreate: {
        where: {
          name: data.category,
        },
        create: {
          name: data.category,
          language: {
            connect: {
              id: data.language,
            },
          },
        },
      },
    };
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
