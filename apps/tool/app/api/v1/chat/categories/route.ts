import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parse } from "qs";
import { z } from "zod";
import prisma from "@lib/utils/prisma";
import { query, language, base } from "@lib/utils/schema";

export const revalidate = 0;

const output = z.array(
  base.extend({
    roles: z.array(base),
    language,
  }),
);

export async function GET(request: NextRequest) {
  const params = query.parse(parse(request.nextUrl.search.slice(1)));

  const categories = await prisma.chat_categories.findMany({
    take: params.limit,
    skip: params.offset,
    where: {
      language: {
        code: params.locale,
      },
    },
    select: {
      id: true,
      name: true,
      roles: {
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
      language: {
        select: {
          name: true,
          code: true,
        },
      },
    },
  });

  return NextResponse.json(output.parse(categories));
}
