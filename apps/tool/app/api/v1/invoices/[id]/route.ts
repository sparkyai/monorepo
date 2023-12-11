import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";
import { parse } from "qs";
import prisma from "@lib/utils/prisma";
import { PaymentSchema } from "@lib/utils/schema";
import { withTokenVerify } from "@lib/utils/validate";

const MethodQuerySchema = z.object({
  method: z.string().min(1),
});

export const revalidate = 0;

type PaymentProps = {
  params: {
    id: string;
  };
};

export const GET = withTokenVerify(async function GET(request: NextRequest, props: PaymentProps) {
  const params = MethodQuerySchema.safeParse(parse(request.nextUrl.search.slice(1)));

  if (!params.success) {
    return NextResponse.json({ error: params.error.format() }, { status: 500 });
  }

  try {
    const payment = await prisma.payments.findUnique({
      where: {
        method_invoice_id: {
          method: params.data.method,
          invoice_id: props.params.id,
        },
      },
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
        method: true,
        invoice_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    return NextResponse.json({ data: payment }, { status: payment ? 200 : 404 });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
});

export const PUT = withTokenVerify(async function PUT(request: NextRequest, props: PaymentProps) {
  const params = MethodQuerySchema.safeParse(parse(request.nextUrl.search.slice(1)));

  if (!params.success) {
    return NextResponse.json({ error: params.error.format() }, { status: 500 });
  }

  const payload = PaymentSchema.pick({ status: true }).safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.format() }, { status: 500 });
  }

  try {
    await prisma.payments.update({
      data: { status: payload.data.status },
      where: {
        method_invoice_id: {
          method: params.data.method,
          invoice_id: props.params.id,
        },
      },
      select: { id: true },
    });

    return GET(new NextRequest(request.url, { headers: request.headers }), {
      params: { id: props.params.id },
    });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
});
