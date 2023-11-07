import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import chat from "./chat.json";
import text from "./text.json";

const prisma = new PrismaClient();

async function seed() {
  await prisma.$transaction([
    prisma.users.deleteMany(),
    prisma.images.deleteMany(),
    prisma.languages.deleteMany(),
    prisma.telegram_users.deleteMany(),
  ]);

  const languages = await prisma.$transaction(async () => {
    await prisma.languages.createMany({
      data: [
        { name: "English", code: "en" },
        { name: "Русский", code: "ru" },
        { name: "Українська", code: "uk" },
      ],
    });

    return prisma.languages.findMany({
      select: {
        id: true,
        code: true,
      },
    });
  });

  await prisma.users.create({
    data: {
      email: faker.internet.email(),
      password: "",
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
    },
  });

  await prisma.telegram_users.create({
    data: {
      id: 0,
      first_name: faker.person.firstName(),
    },
  });

  await Promise.all(
    chat.map((category) =>
      prisma.chat_categories.create({
        data: {
          name: category.name,
          roles: {
            create: category.roles.map((role) => ({
              name: role.name,
              prompt: role.prompt || "",
              parameters: {
                create: role.parameters,
              },
              language_id: getLanguageId(role.language.code),
            })),
          },
          language_id: getLanguageId(category.language.code),
        },
      }),
    ),
  );

  await Promise.all(
    text.map((category) =>
      prisma.text_categories.create({
        data: {
          name: category.name,
          templates: {
            create: category.templates.map((template) => ({
              name: template.name,
              messages: {
                create: template.messages,
              },
              parameters: {
                create: template.parameters,
              },
              language_id: getLanguageId(template.language.code),
            })),
          },
          language_id: getLanguageId(category.language.code),
        },
      }),
    ),
  );

  function getLanguageId(code: string) {
    const language = languages.find((item) => item.code === code);

    if (language) {
      return language.id;
    }

    throw new Error("Invalid language");
  }
}

async function success() {
  await prisma.$disconnect();
}

async function failure(error: Error) {
  await prisma.$disconnect();
  throw error;
}

seed().then(success, failure);
