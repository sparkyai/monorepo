import prisma from "@lib/utils/prisma";

export async function getSession() {
  const user = await prisma.users.findFirstOrThrow();

  return { user };
}
