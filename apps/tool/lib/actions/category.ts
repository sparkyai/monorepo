"use server";

import prisma from "@lib/utils/prisma";

export async function deleteCategory(id: number) {
  return prisma.categories.delete({
    where: { id },
  });
}

export async function updateCategory(id: number, name: string, language: number) {
  return prisma.categories.update({
    where: { id },
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

export async function createCategory(name: string, language: number) {
  return prisma.categories.create({
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
