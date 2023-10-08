import prisma from "@lib/utils/prisma";

export async function getSession() {
  const user = await prisma.user.findFirstOrThrow();

  return { user };
}
