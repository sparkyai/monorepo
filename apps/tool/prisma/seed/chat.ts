import type { PrismaClient } from "@prisma/client";
import chat from "../chat.json";

export async function seed(prisma: PrismaClient) {
  await Promise.all(
    chat.map((category) =>
      prisma.chat_categories.create({
        data: {
          name: category.name,
          roles: {
            create: category.roles?.map((role) => {
              return {
                name: role.name,
                prompt: role.prompt || "",
                parameters: {
                  create: role.parameters,
                },
                language: {
                  connect: { code: role.language.code },
                },
                description: role.description,
              };
            }),
          },
          language: {
            connect: { code: category.language.code },
          },
        },
        select: { id: true },
      }),
    ),
  );
}
