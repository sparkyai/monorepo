import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { env } from "@sparky/env";
import prisma from "@lib/utils/prisma";
import { TelegramUserSchema } from "@lib/utils/schema";
import { withTokenVerify } from "@lib/utils/validate";
import { GET } from "./[id]/route";

export const revalidate = 0;

export const POST = withTokenVerify(async function POST(request: NextRequest) {
  const payload = TelegramUserSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.format() }, { status: 500 });
  }

  try {
    let language: object | undefined = void 0;

    if (payload.data.language) {
      language = {
        connect: {
          code: payload.data.language,
        },
      };
    }

    const user = await prisma.telegram_users.create({
      data: {
        id: payload.data.id,
        language,
        payments: {
          create: {
            amount: 0,
            tokens: env.number("REGISTERED_USER_TOKENS"),
            status: "success",
            method: "registered",
          },
        },
        last_name: payload.data.last_name,
        first_name: payload.data.first_name,
        show_notification: payload.data.show_notification,
      },
      select: { id: true },
    });

    const url = `${request.nextUrl.origin}${request.nextUrl.pathname}/${user.id}${request.nextUrl.search}`;

    return GET(new NextRequest(url, { headers: request.headers }), {
      params: { id: user.id.toString() },
    });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
});
