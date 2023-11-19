"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import * as Sentry from "@sentry/nextjs";
import type { TypeOf } from "zod";
import { TokensSchema } from "@lib/utils/schema";
import prisma from "@lib/utils/prisma";
import { hash } from "@lib/utils/crypto";

function revalidate() {
  revalidatePath("/general/tokens");
}

export async function createToken(payload: TypeOf<typeof TokensSchema>) {
  const token = TokensSchema.safeParse(payload);

  if (!token.success) {
    return { error: token.error.format() };
  }

  try {
    const data = await prisma.tokens.create({
      data: {
        key: hash("RSA-SHA384", randomBytes(32)),
        name: token.data.name,
      },
      select: { key: true },
    });

    revalidate();

    return { data };
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return { error: { _errors: [] } };
  }
}

export async function deleteToken(key: string) {
  try {
    await prisma.tokens.delete({
      where: { key },
      select: { key: true },
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
