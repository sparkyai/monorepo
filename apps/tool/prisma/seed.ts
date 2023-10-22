import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import categories from "./categories.json";

const prisma = new PrismaClient();

async function seed() {
  await prisma.$transaction([
    prisma.users.deleteMany(),
    prisma.images.deleteMany(),
    prisma.languages.deleteMany(),
    prisma.telegram_clients.deleteMany(),
  ]);

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

  let id = 1;
  await Promise.all(
    categories.map((category) =>
      prisma.chat_categories.create({
        data: {
          name: category.name,
          roles: {
            create: category.templates.map((template) => ({
              name: template.name,
              poster: {
                create: {
                  url: faker.image.url(),
                },
              },
              prompt: template.messages[0].content,
              language: {
                connect: {
                  id: language.id,
                },
              },
              parameters: {
                create: {
                  top_p: template.topP,
                  model: template.model,
                  temperature: template.temperature,
                  present_penalty: template.presentPenalty,
                  frequency_penalty: template.frequencyPenalty,
                },
              },
              description: faker.lorem.lines(2),
              interactions: {
                create: [
                  faker.helpers.multiple(
                    () => {
                      const date = faker.date.recent({ days: 60 });

                      return {
                        type: "generate" as const,
                        client: {
                          connectOrCreate: {
                            where: { id },
                            create: { id },
                          },
                        },
                        created_at: date,
                        updated_at: date,
                      };
                    },
                    { count: { min: 10, max: 100 } },
                  ),
                  faker.helpers.multiple(
                    () => {
                      const oldId = id++;

                      return faker.helpers.maybe(() => ({
                        type: faker.helpers.arrayElement(["like", "dislike"]),
                        client: {
                          connectOrCreate: {
                            where: { id: oldId },
                            create: { id: oldId },
                          },
                        },
                      })) as {
                        type: "like";
                        client: {
                          connectOrCreate: {
                            where: {
                              id: number;
                            };
                            create: {
                              id: number;
                            };
                          };
                        };
                      };
                    },
                    { count: 1 },
                  ),
                ]
                  .flat()
                  .filter(Boolean),
              },
            })),
          },
          language: {
            connect: {
              id: language.id,
            },
          },
        },
      }),
    ),
  );

  id = 1;
  await Promise.all(
    categories.map((category) =>
      prisma.text_categories.create({
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
              poster: {
                create: {
                  url: faker.image.url(),
                },
              },
              messages: {
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
              parameters: {
                create: {
                  top_p: template.topP,
                  model: template.model,
                  temperature: template.temperature,
                  present_penalty: template.presentPenalty,
                  frequency_penalty: template.frequencyPenalty,
                },
              },
              description: faker.lorem.lines(2),
              interactions: {
                create: [
                  faker.helpers.multiple(
                    () => {
                      const date = faker.date.recent({ days: 60 });

                      return {
                        type: "generate" as const,
                        client: {
                          connectOrCreate: {
                            where: { id },
                            create: { id },
                          },
                        },
                        created_at: date,
                        updated_at: date,
                      };
                    },
                    { count: { min: 10, max: 100 } },
                  ),
                  faker.helpers.multiple(
                    () => {
                      const oldId = id++;

                      return faker.helpers.maybe(() => ({
                        type: faker.helpers.arrayElement(["like", "dislike"]),
                        client: {
                          connectOrCreate: {
                            where: { id: oldId },
                            create: { id: oldId },
                          },
                        },
                      })) as {
                        type: "like";
                        client: {
                          connectOrCreate: {
                            where: {
                              id: number;
                            };
                            create: {
                              id: number;
                            };
                          };
                        };
                      };
                    },
                    { count: 1 },
                  ),
                ]
                  .flat()
                  .filter(Boolean),
              },
            })),
          },
        },
      }),
    ),
  );

  id = 1;
  await Promise.all(
    categories
      .map((category) =>
        category.templates.map((template) =>
          prisma.image_templates.create({
            data: {
              name: template.name,
              poster: {
                create: {
                  url: faker.image.url(),
                },
              },
              provider: "DALL·E",
              language: {
                connect: {
                  id: language.id,
                },
              },
              description: faker.lorem.lines(2),
              interactions: {
                create: [
                  faker.helpers.multiple(
                    () => {
                      const date = faker.date.recent({ days: 60 });

                      return {
                        type: "generate" as const,
                        client: {
                          connectOrCreate: {
                            where: { id },
                            create: { id },
                          },
                        },
                        created_at: date,
                        updated_at: date,
                      };
                    },
                    { count: { min: 10, max: 100 } },
                  ),
                  faker.helpers.multiple(
                    () => {
                      const oldId = id++;

                      return faker.helpers.maybe(() => ({
                        type: faker.helpers.arrayElement(["like", "dislike"]),
                        client: {
                          connectOrCreate: {
                            where: { id: oldId },
                            create: { id: oldId },
                          },
                        },
                      })) as {
                        type: "like";
                        client: {
                          connectOrCreate: {
                            where: {
                              id: number;
                            };
                            create: {
                              id: number;
                            };
                          };
                        };
                      };
                    },
                    { count: 1 },
                  ),
                ]
                  .flat()
                  .filter(Boolean),
              },
            },
          }),
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
