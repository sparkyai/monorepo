import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parse } from "qs";
import prisma from "@lib/utils/prisma";
import { ListQuerySchema } from "@lib/utils/schema";
import { decoder } from "@lib/utils/qs";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const params = ListQuerySchema.parse(parse(request.nextUrl.search.slice(1), { decoder }));

  const categories = await prisma.text_categories.findMany({
    take: params.limit,
    skip: params.start,
    where: {
      language: {
        code: params.locale,
      },
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
      templates: {
        where: {
          language: {
            code: params.locale,
          },
        },
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return NextResponse.json(categories);
}
