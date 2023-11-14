import type { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import telegram from "../telegram-users.json";

export async function seed(prisma: PrismaClient) {
  await prisma.users.createMany({
    data: {
      email: faker.internet.email(),
      password: "",
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
    },
  });

  await Promise.all(
    telegram.map((user) => {
      return prisma.telegram_users.create({
        data: {
          id: user.id,
          language: user.language ? { connect: { code: user.language.code } } : void 0,
          referrer: user.referrer_id ? { connect: { id: user.referrer_id } } : void 0,
          last_name: user.last_name,
          first_name: user.first_name,
          created_at: user.created_at,
          updated_at: user.updated_at,
          extra_tokens: user.extra_tokens,
        },
      });
    }),
  );
}

export async function clean(prisma: PrismaClient) {
  await prisma.users.deleteMany();
  await prisma.telegram_users.deleteMany();
}
