import type { PrismaClient } from "@prisma/client";
import text from "../text.json";

export async function seed(prisma: PrismaClient) {
  await Promise.all(
    text.map((category) =>
      prisma.text_categories.create({
        data: {
          name: category.name,
          templates: {
            create: category.templates.map((template) => {
              let messages: object | undefined = void 0;

              if (template.messages) {
                messages = {
                  create: template.messages,
                };
              }

              return {
                name: template.name,
                messages,
                language: {
                  connect: { code: template.language.code },
                },
                parameters: {
                  create: template.parameters,
                },
                description: template.description,
              };
            }),
          },
          language: {
            connect: { code: category.language.code },
          },
        },
      }),
    ),
  );
}
