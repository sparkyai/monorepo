import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";
import { TelegramUserSchema, PaymentSchema } from "@lib/utils/schema";
import { withTokenVerify } from "@lib/utils/validate";
import { GET } from "./[id]/route";

export const revalidate = 0;

const PayloadSchema = PaymentSchema.omit({ id: true }).extend({
  telegram: z.object({
    user: TelegramUserSchema.pick({
      id: true,
    }),
  }),
});

export const POST = withTokenVerify(async function POST(request: NextRequest) {
  const payload = PayloadSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.format() }, { status: 500 });
  }

  try {
    const payment = await prisma.payments.create({
      data: {
        user: { connect: payload.data.telegram.user },
        amount: payload.data.amount,
        tokens: payload.data.tokens,
        status: payload.data.status,
        method: payload.data.method,
        invoice_id: payload.data.invoice_id,
      },
      select: { id: true },
    });

    const url = `${request.nextUrl.origin}${request.nextUrl.pathname}/${payment.id}${request.nextUrl.search}`;

    return GET(new NextRequest(url, { headers: request.headers }), {
      params: { id: payment.id.toString() },
    });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
});
