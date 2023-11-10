import prisma from "../lib/utils/prisma";
import * as chat from "./seed/chat";
import * as text from "./seed/text";
import * as image from "./seed/image";
import * as users from "./seed/users";
import * as languages from "./seed/languages";

async function run() {
  await prisma.$connect();

  await prisma.$transaction(async () => {
    await users.clean(prisma);
    await languages.clean(prisma);

    await prisma.images.deleteMany();
  });

  await prisma.$transaction(async () => {
    await languages.seed(prisma);

    await users.seed(prisma);

    await chat.seed(prisma);
    await text.seed(prisma);
    await image.seed(prisma);
  });

  await prisma.$disconnect();
}

async function failure(error: Error) {
  await prisma.$disconnect();
  throw error;
}

run().catch(failure);
