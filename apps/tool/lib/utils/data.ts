import { notFound } from "next/navigation";
import prisma from "@lib/utils/prisma";

export async function getTemplate(id: number, details?: boolean) {
  const template = await prisma.templates.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      top_p: details,
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
        },
        orderBy: {
          id: "asc",
        },
      },
      temperature: details,
      present_penalty: details,
      frequency_penalty: details,
    },
  });

  if (template) {
    return template;
  }

  notFound();
}

export async function getTemplates() {
  return prisma.templates.findMany({
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
  return prisma.categories.findMany({
    include: {
      _count: {
        select: {
          templates: true,
        },
      },
      language: {
        select: {
          id: true,
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
  const template = await prisma.roles.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      top_p: details,
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
      present_penalty: details,
      frequency_penalty: details,
    },
  });

  if (template) {
    return template;
  }

  notFound();
}

export async function getRoles() {
  return prisma.roles.findMany({
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
  return prisma.languages.findMany({
    orderBy: {
      code: "asc",
    },
  });
}
