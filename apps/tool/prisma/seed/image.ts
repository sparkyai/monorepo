import type { PrismaClient } from "@prisma/client";
import image from "../image.json";

export async function seed(prisma: PrismaClient) {
  await Promise.all(
    image.map((template) => {
      return prisma.image_templates.create({
        data: {
          name: template.name,
          model: template.model,
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
