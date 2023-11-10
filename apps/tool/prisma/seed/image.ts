import type { PrismaClient } from "@prisma/client";
import image from "../image.json";

export async function seed(prisma: PrismaClient) {
  await Promise.all(
    image.map((template) => {
      let poster: object | undefined = void 0;

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- d
      if (template.poster) {
        const url = new URL(template.poster.url);

        poster = {
          create: {
            mime: "",
            width: 0,
            height: 0,
            pathname: url.pathname,
          },
        };
      }

      return prisma.image_templates.create({
        data: {
          name: template.name,
          model: template.model,
          poster,
          provider: template.provider,
          language: {
            connect: { code: template.language.code },
          },
          description: template.description,
        },
      });
    }),
  );
}
