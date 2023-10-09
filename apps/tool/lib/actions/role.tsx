"use server";

import prisma from "@lib/utils/prisma";

export async function createRole(name: string, language: number) {
  return prisma.roles.create({
    data: {
      name,
      language: {
        connect: {
          id: language,
        },
      },
    },
  });
}

export async function deleteRole(id: number) {
  return prisma.roles.delete({
    where: { id },
  });
}

type RoleData = {
  name?: string;
  topP?: number;
  model?: string;
  language?: number;
  temperature?: number;
  presentPenalty?: number;
  frequencyPenalty?: number;
};

export async function updateRole(id: number, data: RoleData) {
  return prisma.roles.update({
    where: { id },
    data: {
      ...data,
      language: data.language
        ? {
            connect: {
              id: data.language,
            },
          }
        : void 0,
    },
  });
}

export async function updateRoleSystemPrompt(id: number, content: string) {
  await prisma.role_systems_promps.upsert({
    where: {
      role_id: id,
    },
    update: {
      content,
    },
    create: {
      role: {
        connect: { id },
      },
      content,
    },
  });
}
