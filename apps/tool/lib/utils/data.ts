import { notFound } from "next/navigation";
import prisma from "@lib/utils/prisma";

export async function getTemplate(id: number, details?: boolean) {
  const template = await prisma.template.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      topP: details,
      model: details,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      context: details && {
        select: {
          id: details,
          role: details,
          content: details,
          position: details,
        },
        orderBy: {
          position: "asc",
        },
      },
      temperature: details,
      presentPenalty: details,
      frequencyPenalty: details,
    },
  });

  if (template) {
    return template;
  }

  notFound();
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
}
