"use server";

import { revalidatePath } from "next/cache";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";

function revalidate() {
  revalidatePath("/telegram/users");
}

export async function userTopUp(id: bigint, tokens: number) {
  try {
    await prisma.telegram_users.update({
      data: {
        extra_tokens: {
          increment: tokens,
        },
      },
      where: { id },
      select: { id: true },
    });

    revalidate();

    return { data: null };
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return { error: { _errors: [] } };
  }
}
