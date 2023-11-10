import type { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

export async function seed(prisma: PrismaClient) {
  await prisma.users.createMany({
    data: {
      email: faker.internet.email(),
      password: "",
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
    },
  });

  await prisma.telegram_users.createMany({
    data: {
      id: 0,
      last_name: faker.person.lastName(),
      first_name: faker.person.firstName(),
    },
  });
}

export async function clean(prisma: PrismaClient) {
  await prisma.users.deleteMany();
  await prisma.telegram_users.deleteMany();
}
