import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";
import { UserSchema } from "@lib/utils/schema";
import { getUserTokenBalance } from "@lib/data/telegram/user";

export const revalidate = 0;

type UserProps = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, props: UserProps) {
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
      },
    });

    if (!user) {
      return NextResponse.json({ data: user }, { status: 404 });
    }

    return NextResponse.json({
      data: {
        id: user.id,
        tokens: await getUserTokenBalance(user.id),
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
}

export async function PUT(request: NextRequest, props: UserProps) {
  const payload = UserSchema.partial().safeParse(await request.json());

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

    return GET(new NextRequest(request.url), {
      params: { id: user.id.toString() },
    });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
}
