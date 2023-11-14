"use server";

import * as Sentry from "@sentry/nextjs";
import type { TypeOf } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "@lib/utils/prisma";
import { ChatRoleSchema } from "@lib/utils/schema";
import { remove } from "@lib/actions/s3";

function revalidate(id?: number) {
  revalidatePath(id ? `/chat/roles/${id}` : "/chat/roles");
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

    if ("poster" in role.data) {
      const image = await prisma.chat_roles.findUniqueOrThrow({ where: { id } }).poster({
        select: { s3_key: true },
      });

      if (image) {
        await remove(image.s3_key);
      }

      if (role.data.poster) {
        poster = {
          upsert: {
            update: role.data.poster,
            create: role.data.poster,
          },
        };
      } else {
        poster = {
          delete: {},
        };
      }
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

    revalidate(id);

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
