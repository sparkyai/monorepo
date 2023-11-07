import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";
import { UserSchema } from "@lib/utils/schema";

export const revalidate = 0;

export async function POST(request: NextRequest) {
  const payload = UserSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.format() }, { status: 500 });
  }

  try {
    const user = await prisma.telegram_users.create({
      data: {
        id: payload.data.id,
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

    return NextResponse.json({ data: user });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
}
