import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parse } from "qs";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";
import { ListQuerySchema } from "@lib/utils/schema";
import { decoder } from "@lib/utils/qs";
import { withTokenVerify } from "@lib/utils/validate";

export const revalidate = 0;

type CategoryProps = {
  params: {
    id: string;
  };
};

export const GET = withTokenVerify(async function GET(request: NextRequest, props: CategoryProps) {
  const category = await prisma.chat_categories.findUnique({
    where: { id: Number(props.params.id) },
    select: { id: true },
  });

  if (!category) {
    return NextResponse.json({ data: category }, { status: 404 });
  }

  const params = ListQuerySchema.safeParse(parse(request.nextUrl.search.slice(1), { decoder }));

  if (!params.success) {
    return NextResponse.json({ error: params.error.format() }, { status: 500 });
  }

  try {
    const [total, data] = await Promise.all([
      prisma.chat_roles.count({
        where: {
          category,
          language: { code: params.data.locale },
        },
      }),
      prisma.chat_roles.findMany({
        take: params.data.limit,
        skip: params.data.start,
        where: {
          category,
          language: { code: params.data.locale },
        },
        select: {
          id: true,
          name: true,
          language: {
            select: {
              name: true,
              code: true,
            },
          },
        },
        orderBy: { name: "asc" },
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
});
