"use server";

import prisma from "@lib/utils/prisma";

export type ImageTemplate = {
  name: string;
  model: null | string;
  provider: string;
  language: number;
};

export async function createImageTemplate(data: ImageTemplate) {
  return prisma.image_templates.create({
    data: {
      name: data.name.trim(),
      model: data.model,
      provider: data.provider,
      language: {
        connect: {
          id: data.language,
        },
      },
      // poster
      // description
    },
    select: {
      id: true,
      name: true,
      model: true,
      poster: true,
      provider: true,
      language: true,
    },
  });
}

export async function updateImageTemplate(id: number, data: Partial<ImageTemplate>) {
  await prisma.image_templates.update({
    data: {
      name: data.name?.trim(),
      model: data.model,
      provider: data.provider,
      language: data.language
        ? {
            connect: {
              id: data.language,
            },
          }
        : void 0,
      // poster
      // description
    },
    where: { id },
    select: { id: true },
  });
}

export async function deleteImageTemplate(id: number) {
  await prisma.image_templates.delete({
    where: { id },
    select: { id: true },
  });
}
