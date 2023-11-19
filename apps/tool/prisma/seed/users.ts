import type { PrismaClient } from "@prisma/client";
import telegram from "../telegram-users.json";

export async function seed(prisma: PrismaClient) {
  await prisma.users.createMany({
    data: {
      email: "vladstsk@gmail.com",
      password: "$2b$10$eI.vgdEMCE6Y1sEC4FXn/uxJ1q.zru3A3V3htyig.ImMU4dFAzo12",
      last_name: "Stasiuk",
      first_name: "Vladyslav",
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
