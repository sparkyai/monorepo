import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";
import { UserSchema } from "@lib/utils/schema";

export const revalidate = 0;

type UserProps = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, props: UserProps) {
  try {
    const user = await prisma.telegram_users.findUnique({
      where: {
        id: parseInt(props.params.id),
      },
      select: {
        id: true,
        language: {
          select: {
            code: true,
            name: true,
          },
        },
        first_name: true,
        last_name: true,
      },
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- d
    // @ts-expect-error
    user.tokens = 1000;

    return NextResponse.json({ data: user }, { status: user ? 200 : 404 });
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
    const user = await prisma.telegram_users.update({
      data: {
        first_name: payload.data.first_name,
        last_name: payload.data.last_name,
        language: payload.data.language
          ? {
              connect: {
                code: payload.data.language,
              },
            }
          : void 0,
      },
      where: { id: parseInt(props.params.id) },
      select: {
        id: true,
        language: {
          select: {
            code: true,
            name: true,
          },
        },
        first_name: true,
        last_name: true,
      },
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- d
    // @ts-expect-error
    user.tokens = 1000;

    return NextResponse.json({ data: user });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
}
