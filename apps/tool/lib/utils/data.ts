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
      language: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
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

export async function getTemplates() {
  return prisma.template.findMany({
    select: {
      id: true,
      name: true,
      language: {
        select: {
          name: true,
          code: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    include: {
      _count: {
        select: {
          templates: true,
        },
      },
      language: {
        select: {
          name: true,
          code: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function getRole(id: number, details?: boolean) {
  const template = await prisma.role.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      topP: details,
      model: details,
      language: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
      system: details && {
        select: {
          id: details,
          role: details,
          content: details,
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

export async function getRoles() {
  return prisma.role.findMany({
    select: {
      id: true,
      name: true,
      language: {
        select: {
          name: true,
          code: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function getLanguages() {
  return prisma.language.findMany({
    orderBy: {
      code: "asc",
    },
  });
}
