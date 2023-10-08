import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  await prisma.$transaction([prisma.user.deleteMany(), prisma.setting.deleteMany(), prisma.language.deleteMany()]);

  const languages = await prisma.$transaction(async () => {
    await prisma.language.createMany({
      data: [
        { name: "English", code: "en" },
        { name: "Русский", code: "ru" },
        { name: "Українська", code: "uk" },
      ],
    });

    return prisma.language.findMany();
  });

  await prisma.setting.createMany({
    data: [{ name: "language", value: "en" }],
  });

  await prisma.user.create({
    data: {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      surname: faker.person.lastName(),
      password: "",
    },
  });

  await Promise.all(
    languages
      .map((language) =>
        faker.helpers.multiple(
          () =>
            prisma.category.create({
              data: {
                name: faker.word.words(1),
                language: {
                  connect: {
                    id: language.id,
                  },
                },
                templates: {
                  create: faker.helpers.multiple(
                    () => ({
                      name: faker.word.words(1),
                      language: {
                        connect: {
                          id: language.id,
                        },
                      },
                    }),
                    { count: { min: 1, max: 5 } },
                  ),
                },
              },
            }),
          { count: { min: 1, max: 5 } },
        ),
      )
      .flat(),
  );

  await Promise.all(
    languages
      .map((language) =>
        faker.helpers.uniqueArray(
          () =>
            prisma.role.create({
              data: {
                name: faker.word.words(1),
                language: {
                  connect: {
                    id: language.id,
                  },
                },
              },
            }),
          10,
        ),
      )
      .flat(),
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
