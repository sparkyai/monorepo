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
  const [templates, reactions] = await Promise.all([
    prisma.templates.findMany({
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
        regenerated: true,
      },
      orderBy: {
        id: "desc",
      },
    }),
    prisma.template_reactions.groupBy({
      by: ["liked", "template_id"],
      _count: true,
    }),
  ]);

  return templates.map((template) => {
    const templateReactions = reactions.filter((reaction) => reaction.template_id === template.id);
    const liked = templateReactions.find((reaction) => reaction.liked);
    const disliked = templateReactions.find((reaction) => !reaction.liked);

    return { ...template, liked: liked?._count || 0, disliked: disliked?._count || 0 };
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

export async function getImageTemplates() {
  return prisma.image_templates.findMany({
    include: {
      language: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}
