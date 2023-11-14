import type { PrismaClient } from "@prisma/client";
import image from "../image.json";

export async function seed(prisma: PrismaClient) {
  await Promise.all(
    image.map((template) => {
      let poster: object | undefined = void 0;

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
