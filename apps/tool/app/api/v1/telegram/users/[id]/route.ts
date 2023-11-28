import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";
import { TelegramUserSchema } from "@lib/utils/schema";
import { getUserSubscriptionBalance } from "@lib/data/telegram/user";
import { withTokenVerify } from "@lib/utils/validate";

export const revalidate = 0;

type UserProps = {
  params: {
    id: string;
  };
};

export const GET = withTokenVerify(async function GET(_: NextRequest, props: UserProps) {
  try {
    const user = await prisma.telegram_users.findUnique({
      where: { id: Number(props.params.id) },
      select: {
        id: true,
        language: {
          select: {
            code: true,
            name: true,
          },
        },
        last_name: true,
        first_name: true,
        extra_tokens: true,
        show_notification: true,
      },
    });

    if (!user) {
      return NextResponse.json({ data: user }, { status: 404 });
    }

    return NextResponse.json({
      data: {
        id: user.id,
        tokens: Math.max(0, await getUserSubscriptionBalance(user.id)) + user.extra_tokens,
        language: user.language,
        last_name: user.last_name,
        first_name: user.first_name,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
});

export const PUT = withTokenVerify(async function PUT(request: NextRequest, props: UserProps) {
  const payload = TelegramUserSchema.partial().safeParse(await request.json());

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

    const user = await prisma.telegram_users.update({
      data: {
        language,
        last_name: payload.data.last_name,
        first_name: payload.data.first_name,
      },
      where: { id: Number(props.params.id) },
      select: { id: true },
    });

    return GET(new NextRequest(request.url, { headers: request.headers }), {
      params: { id: user.id.toString() },
    });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
});

export const DELETE = withTokenVerify(async function DELETE(_: NextRequest, props: UserProps) {
  try {
    await prisma.telegram_users.delete({
      where: { id: Number(props.params.id) },
      select: { id: true },
    });

    return NextResponse.json({ data: null });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
});
