import type { PrismaClient } from "@prisma/client";

export async function seed(prisma: PrismaClient) {
  await prisma.languages.createMany({
    data: [
      { name: "English", code: "en" },
      { name: "Русский", code: "ru" },
      { name: "Українська", code: "uk" },
    ],
  });
}

export async function clean(prisma: PrismaClient) {
  await prisma.languages.deleteMany();
}
