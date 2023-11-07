import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";
import { UserSchema, PaymentSchema } from "@lib/utils/schema";

export const revalidate = 0;

const PayloadSchema = PaymentSchema.omit({ id: true, status: true }).extend({
  telegram: z.object({
    user: UserSchema.pick({
      id: true,
    }),
  }),
});

export async function POST(request: NextRequest) {
  const payload = PayloadSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.format() }, { status: 500 });
  }

  try {
    const payment = await prisma.payments.create({
      data: {
        user: {
          connect: payload.data.telegram.user,
        },
        amount: payload.data.amount,
        tokens: payload.data.tokens,
        status: "created",
        provider: payload.data.provider,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
          },
        },
        amount: true,
        tokens: true,
        status: true,
        provider: true,
      },
    });

    return NextResponse.json({ data: payment });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
}
