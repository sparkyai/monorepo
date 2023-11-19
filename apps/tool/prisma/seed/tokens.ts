import { randomBytes } from "node:crypto";
import type { PrismaClient } from "@prisma/client";
import { hash } from "../../lib/utils/crypto";

export async function seed(prisma: PrismaClient) {
  await prisma.tokens.create({
    data: {
      key: hash("RSA-SHA384", randomBytes(32)),
      name: "Develop Token",
    },
  });
}

export async function clean(prisma: PrismaClient) {
  await prisma.tokens.deleteMany();
}
