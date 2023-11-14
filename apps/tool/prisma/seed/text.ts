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
              let poster: object | undefined = void 0;
              let messages: object | undefined = void 0;

              if (template.poster) {
                const url = new URL(template.poster.url);

                poster = {
                  create: {
                    mime: "",
                    width: 0,
                    height: 0,
                    s3_key: url.pathname.slice(1),
                  },
                };
              }

              if (template.messages) {
                messages = {
                  create: template.messages,
                };
              }

              return {
                name: template.name,
                poster,
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
