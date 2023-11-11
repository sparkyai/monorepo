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
              let poster: object | undefined = void 0;

              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- d
              if (role.poster) {
                const url = new URL(role.poster.url);

                poster = {
                  create: {
                    mime: "",
                    width: 0,
                    height: 0,
                    pathname: url.pathname,
                  },
                };
              }

              return {
                name: role.name,
                prompt: role.prompt || "",
                poster,
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