"use server";

import prisma from "@lib/utils/prisma";

export async function deleteCategory(id: number) {
  return prisma.category.delete({
    where: { id },
  });
}

export async function updateCategory(id: number, name: string) {
  return prisma.category.update({
    where: { id },
    data: { name },
  });
}
