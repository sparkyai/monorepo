"use server";

import prisma from "@lib/utils/prisma";
import { uploadObject, deleteObject } from "@lib/utils/s3";

function getTemplatePosterKey(id: number) {
  return `image-template-${id}-poster`;
}

export type ImageTemplate = {
  name: string;
  model: null | string;
  poster?: null | File;
  provider: string;
  language: number;
  description?: string;
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
      description: data.description?.trim(),
    },
    select: {
      id: true,
      name: true,
      model: true,
      poster: true,
      provider: true,
      language: true,
      description: true,
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
      description: data.description?.trim(),
    },
    where: { id },
    select: { id: true },
  });
}

export async function updateImageTemplatePoster(id: number, data: FormData) {
  if (data.has("poster")) {
    const url = await uploadObject(getTemplatePosterKey(id), data.get("poster") as File);

    await prisma.image_templates.update({
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

    return url;
  }

  const poster = await prisma.image_templates.findUniqueOrThrow({ where: { id } }).poster({
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

export async function deleteImageTemplate(id: number) {
  const template = await prisma.image_templates.delete({
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
