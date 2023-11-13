"use server";

import * as Sentry from "@sentry/nextjs";
import type { TypeOf } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "@lib/utils/prisma";
import { ChatRoleSchema } from "@lib/utils/schema";

function revalidate() {
  revalidatePath("/chat/roles");
}

export async function createChatRole(payload: TypeOf<typeof ChatRoleSchema>) {
  const role = ChatRoleSchema.safeParse(payload);

  if (!role.success) {
    return { error: role.error.format() };
  }

  try {
    let poster: object | undefined = void 0;

    if (role.data.poster) {
      poster = {
        create: role.data.poster,
      };
    }

    let parameters: object | undefined = void 0;

    if (role.data.parameters) {
      parameters = {
        create: role.data.parameters,
      };
    }

    const data = await prisma.chat_roles.create({
      data: {
        name: role.data.name,
        prompt: role.data.prompt,
        category: {
          connect: { id: role.data.category },
        },
        poster,
        language: {
          connect: { code: role.data.language },
        },
        parameters,
        description: role.data.description,
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

export async function updateChatRole(id: number, payload: Partial<TypeOf<typeof ChatRoleSchema>>) {
  const role = ChatRoleSchema.partial().safeParse(payload);

  if (!role.success) {
    return { error: role.error.format() };
  }

  try {
    let poster: object | undefined = void 0;

    if (role.data.poster) {
      poster = {
        update: role.data.poster,
      };
    }

    let category: object | undefined = void 0;

    if (role.data.category) {
      category = {
        connect: { id: role.data.category },
      };
    }

    let language: object | undefined = void 0;

    if (role.data.language) {
      language = {
        connect: { code: role.data.language },
      };
    }

    let parameters: object | undefined = void 0;

    if (role.data.parameters) {
      parameters = {
        upsert: {
          create: role.data.parameters,
          update: role.data.parameters,
        },
      };
    }

    await prisma.chat_roles.update({
      data: {
        name: role.data.name,
        prompt: role.data.prompt,
        poster,
        category,
        language,
        parameters,
        description: role.data.description,
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

export async function deleteChatRole(id: number) {
  try {
    const role = await prisma.chat_roles.delete({
      where: { id },
      select: {
        poster: {
          select: {
            id: true,
            pathname: true,
          },
        },
      },
    });

    if (role.poster) {
      await prisma.images.delete({
        where: { id: role.poster.id },
        select: { id: true },
      });

      // todo(aws): remove image from s3
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
