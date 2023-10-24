"use server";

import prisma from "@lib/utils/prisma";
import { uploadObject, deleteObject } from "@lib/utils/s3";

function getRolePosterKey(id: number) {
  return `char-role-${id}-poster`;
}

export type ChatRole = {
  name: string;
  prompt?: string;
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

export async function createChatRole(data: ChatRole) {
  return prisma.chat_roles.create({
    data: {
      name: data.name.trim(),
      prompt: data.prompt?.trim(),
      // poster?: imagesCreateNestedOneWithoutChat_rolesInput
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

export async function updateChatRole(id: number, data: Partial<ChatRole>) {
  await prisma.chat_roles.update({
    data: {
      name: data.name?.trim(),
      prompt: data.prompt?.trim(),
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

export async function updateChatRolePoster(id: number, data: FormData) {
  if (data.has("poster")) {
    const url = await uploadObject(getRolePosterKey(id), data.get("poster") as File);

    await prisma.chat_roles.update({
      data: {
        poster: {
          create: {
            url,
          },
        },
      },
      where: { id },
      select: { id: true },
    });
  } else {
    const poster = await prisma.chat_roles.findUniqueOrThrow({ where: { id } }).poster({
      select: {
        id: true,
        url: true,
      },
    });

    if (poster) {
      await prisma.images.delete({
        where: { id: poster.id },
        select: { id: true },
      });

      await deleteObject(getRolePosterKey(id));
    }
  }
}

export async function deleteChatRole(id: number) {
  const role = await prisma.chat_roles.delete({
    where: { id },
    select: {
      poster: {
        select: {
          id: true,
        },
      },
    },
  });

  if (role.poster) {
    await Promise.all([
      deleteObject(getRolePosterKey(id)),
      prisma.images.delete({
        where: { id: role.poster.id },
        select: { id: true },
      }),
    ]);
  }
}

export type ChatCategory = {
  name: string;
  language: number;
};

export async function createChatCategory(data: ChatCategory) {
  return prisma.chat_categories.create({
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
          roles: true,
        },
      },
      language: true,
    },
  });
}

export async function updateChatCategory(id: number, data: Partial<ChatCategory>) {
  await prisma.chat_categories.update({
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

export async function deleteChatCategory(id: number) {
  await prisma.chat_categories.delete({
    where: { id },
    select: { id: true },
  });
}
