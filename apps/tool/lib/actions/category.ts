"use server";

import prisma from "@lib/utils/prisma";

export async function deleteCategory(id: number) {
  return prisma.categories.delete({
    where: { id },
  });
}

export async function updateCategory(id: number, name: string) {
  return prisma.categories.update({
    where: { id },
    data: { name },
  });
}
