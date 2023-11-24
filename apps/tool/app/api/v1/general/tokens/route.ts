import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { parse } from "qs";
import prisma from "@lib/utils/prisma";
import { PaginationSchema } from "@lib/utils/schema";
import { decoder } from "@lib/utils/qs";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const params = PaginationSchema.safeParse(parse(request.nextUrl.search.slice(1), { decoder }));

  if (!params.success) {
    return NextResponse.json({ error: params.error.format() }, { status: 500 });
  }

  try {
    const [total, data] = await Promise.all([
      prisma.tokens.count(),
      prisma.tokens.findMany({
        take: params.data.limit,
        skip: params.data.start,
        select: { key: true },
        orderBy: { created_at: "asc" },
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
