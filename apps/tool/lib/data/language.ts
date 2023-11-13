import prisma from "@lib/utils/prisma";

export async function getLanguageCollection(start?: number, limit?: number) {
  return prisma.languages.findMany({
    skip: start,
    take: limit,
    select: {
      code: true,
      name: true,
    },
    orderBy: { code: "asc" },
  });
}
