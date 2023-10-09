import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import categories from "./categories.json";

const prisma = new PrismaClient();

async function seed() {
  await prisma.$transaction([prisma.users.deleteMany(), prisma.languages.deleteMany()]);

  const language = await prisma.$transaction(async () => {
    await prisma.languages.createMany({
      data: [
        { name: "English", code: "en" },
        { name: "Русский", code: "ru" },
        { name: "Українська", code: "uk" },
      ],
    });

    return prisma.languages.findFirstOrThrow({
      where: {
        code: "ru",
      },
    });
  });

  await prisma.users.create({
    data: {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      surname: faker.person.lastName(),
      password: "",
    },
  });

  await Promise.all(
    categories.map((category) =>
      prisma.categories.create({
        data: {
          name: category.name,
          language: {
            connect: {
              id: language.id,
            },
          },
          templates: {
            create: category.templates.map((template) => ({
              name: template.name,
              top_p: template.topP,
              model: template.model,
              context: {
                create: template.messages.map((message) => ({
                  role: message.role,
                  content: message.content,
                })),
              },
              language: {
                connect: {
                  id: language.id,
                },
              },
              temperature: template.temperature,
              present_penalty: template.presentPenalty,
              frequency_penalty: template.frequencyPenalty,
            })),
          },
        },
      }),
    ),
  );
}

async function success() {
  await prisma.$disconnect();
}

async function failure(error: Error) {
  await prisma.$disconnect();
  throw error;
}

seed().then(success, failure);
