"use server";

import prisma from "@lib/utils/prisma";

export type ChatRole = {
  name: string;
  prompt?: string;
  category: number;
  language: number;
  parameters?: {
    model?: string;
    top_p?: number;
    temperature?: number;
    present_penalty?: number;
    frequency_penalty?: number;
  };
};

export async function createChatRole(data: ChatRole) {
  return prisma.chat_roles.create({
    data: {
      name: data.name.trim(),
      prompt: data.prompt?.trim(),
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
      // poster?: imagesCreateNestedOneWithoutChat_rolesInput
      // description?: string | null
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
      // poster?: imagesCreateNestedOneWithoutChat_rolesInput
      // description?: string | null
    },
    where: { id },
    select: { id: true },
  });
}

export async function deleteChatRole(id: number) {
  await prisma.chat_roles.delete({
    where: { id },
    select: { id: true },
  });
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
