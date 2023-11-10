import { NextRequest, NextResponse } from "next/server";
import { parse } from "qs";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";
import { PaginationSchema, UserSchema } from "@lib/utils/schema";
import { decoder } from "@lib/utils/qs";
import { GET as GETUser } from "../route";

export const revalidate = 0;

type UserProps = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, props: UserProps) {
  const user = await prisma.telegram_users.findUnique({
    where: { id: Number(props.params.id) },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ data: user }, { status: 404 });
  }

  const params = PaginationSchema.safeParse(parse(request.nextUrl.search.slice(1), { decoder }));

  if (!params.success) {
    return NextResponse.json({ error: params.error.format() }, { status: 500 });
  }

  try {
    const [total, data] = await Promise.all([
      prisma.telegram_users.count({
        where: { referrer: user },
      }),
      prisma.telegram_users.findMany({
        take: params.data.limit,
        skip: params.data.start,
        where: { referrer: user },
        select: {
          id: true,
          last_name: true,
          first_name: true,
          language: {
            select: {
              name: true,
              code: true,
            },
          },
        },
        orderBy: { id: "asc" },
      }),
    ]);

    return NextResponse.json({
      data,
      meta: {
        pagination: {
          start: params.data.start,
          limit: params.data.limit,
          total,
        },
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
}

export async function POST(request: NextRequest, props: UserProps) {
  const referrer = await prisma.telegram_users.findUnique({
    where: { id: Number(props.params.id) },
    select: { id: true },
  });

  if (!referrer) {
    return NextResponse.json({ data: referrer }, { status: 404 });
  }

  const payload = UserSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.format() }, { status: 500 });
  }

  try {
    await prisma.telegram_users.update({
      data: {
        extra_tokens: {
          increment: Number(process.env.REFERRER_EXTRA_TOKENS as unknown as string),
        },
      },
      where: { id: Number(props.params.id) },
      select: { id: true },
    });

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
        referrer: {
          connect: referrer,
        },
        last_name: payload.data.last_name,
        first_name: payload.data.first_name,
      },
      select: { id: true },
    });

    const url = `${request.nextUrl.origin}${request.nextUrl.pathname}/${user.id}${request.nextUrl.search}`;

    return GETUser(new NextRequest(url), {
      params: { id: user.id.toString() },
    });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
}
