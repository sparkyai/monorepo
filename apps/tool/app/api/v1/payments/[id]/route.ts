import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";
import { PaymentSchema } from "@lib/utils/schema";

export const revalidate = 0;

type PaymentProps = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, props: PaymentProps) {
  try {
    const payment = await prisma.payments.findUnique({
      where: { id: props.params.id },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        status: true,
        amount: true,
        tokens: true,
        provider: true,
        created_at: true,
        updated_at: true,
        expired_at: true,
      },
    });

    return NextResponse.json({ data: payment }, { status: payment ? 200 : 404 });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, props: PaymentProps) {
  const payload = PaymentSchema.pick({ status: true }).safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.format() }, { status: 500 });
  }

  try {
    const user = await prisma.payments.update({
      data: { status: payload.data.status },
      where: { id: props.params.id },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        status: true,
        amount: true,
        tokens: true,
        provider: true,
        created_at: true,
        updated_at: true,
        expired_at: true,
      },
    });

    return NextResponse.json({ data: user });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
}
