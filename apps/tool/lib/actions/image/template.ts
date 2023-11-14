"use server";

import * as Sentry from "@sentry/nextjs";
import type { TypeOf } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "@lib/utils/prisma";
import { ImageTemplateSchema } from "@lib/utils/schema";
import { remove } from "@lib/actions/s3";

function revalidate() {
  revalidatePath("/image/templates");
}

export async function createImageTemplate(payload: TypeOf<typeof ImageTemplateSchema>) {
  const template = ImageTemplateSchema.safeParse(payload);

  if (!template.success) {
    return { error: template.error.format() };
  }

  try {
    let poster: object | undefined = void 0;

    if (template.data.poster) {
      poster = {
        create: template.data.poster,
      };
    }

    const data = await prisma.image_templates.create({
      data: {
        name: template.data.name,
        model: template.data.model,
        poster,
        provider: template.data.provider,
        language: {
          connect: { code: template.data.language },
        },
        description: template.data.description,
      },
      select: { id: true },
    });

    revalidate();

    return { data };
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return { error: { _errors: [] } };
  }
}

export async function updateImageTemplate(id: number, payload: Partial<TypeOf<typeof ImageTemplateSchema>>) {
  const template = ImageTemplateSchema.partial().safeParse(payload);

  if (!template.success) {
    return { error: template.error.format() };
  }

  try {
    let poster: object | undefined = void 0;

    if ("poster" in template.data) {
      const image = await prisma.image_templates.findUniqueOrThrow({ where: { id } }).poster({
        select: { s3_key: true },
      });

      if (image) {
        await remove(image.s3_key);
      }

      if (template.data.poster) {
        poster = {
          upsert: {
            update: template.data.poster,
            create: template.data.poster,
          },
        };
      } else {
        poster = {
          delete: {},
        };
      }
    }

    await prisma.image_templates.update({
      data: {
        name: template.data.name,
        model: template.data.model,
        poster,
        provider: template.data.provider,
        language: {
          connect: { code: template.data.language },
        },
        description: template.data.description,
      },
      where: { id },
      select: { id: true },
    });

    revalidate();

    return { data: null };
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return { error: { _errors: [] } };
  }
}

export async function deleteImageTemplate(id: number) {
  try {
    const role = await prisma.image_templates.delete({
      where: { id },
      select: {
        poster: {
          select: {
            id: true,
            s3_key: true,
          },
        },
      },
    });

    if (role.poster) {
      const image = await prisma.images.delete({
        where: { id: role.poster.id },
        select: { s3_key: true },
      });

      await remove(image.s3_key);
    }

    revalidate();

    return { data: null };
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return { error: { _errors: [] } };
  }
}
