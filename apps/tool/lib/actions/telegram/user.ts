"use server";

import { revalidatePath } from "next/cache";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";

function revalidate() {
  revalidatePath("/telegram/users");
}

export async function userTopUp(id: number | bigint, tokens: number) {
  try {
    await prisma.payments.create({
      data: {
        user: {
          connect: { id },
        },
        amount: 0,
        tokens,
        status: "success",
        method: "top up",
      },
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
