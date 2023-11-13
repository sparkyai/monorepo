"use server";

import * as Sentry from "@sentry/nextjs";
import type { TypeOf } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "@lib/utils/prisma";
import { ChatCategorySchema } from "@lib/utils/schema";

function revalidate() {
  revalidatePath("/chat/categories");
}

export async function createChatCategory(payload: TypeOf<typeof ChatCategorySchema>) {
  const category = ChatCategorySchema.safeParse(payload);

  if (!category.success) {
    return { error: category.error.format() };
  }

  try {
    const data = await prisma.chat_categories.create({
      data: {
        name: category.data.name,
        language: {
          connect: { code: category.data.language },
        },
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

export async function updateChatCategory(id: number, payload: Partial<TypeOf<typeof ChatCategorySchema>>) {
  const category = ChatCategorySchema.partial().safeParse(payload);

  if (!category.success) {
    return { error: category.error.format() };
  }

  try {
    await prisma.chat_categories.update({
      data: {
        name: category.data.name,
        language: {
          connect: { code: category.data.language },
        },
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

export async function deleteChatCategory(id: number) {
  try {
    const category = await prisma.chat_categories.delete({
      where: { id },
      select: {
        roles: {
          select: {
            poster: {
              select: {
                id: true,
                pathname: true,
              },
            },
          },
        },
      },
    });

    const images = category.roles.map((role) => role.poster).filter(Boolean) as { id: string; pathname: string }[];

    await prisma.images.deleteMany({
      where: { id: { in: images.map((image) => image.id) } },
    });

    // todo(aws): remove image from s3

    revalidate();

    return { data: null };
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return { error: { _errors: [] } };
  }
}
