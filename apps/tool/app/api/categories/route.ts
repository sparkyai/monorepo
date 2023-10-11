import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parse } from "qs";
import { z } from "zod";
import prisma from "@lib/utils/prisma";

export const revalidate = 0;

const query = z.object({
  limit: z.optional(
    z
      .string()
      .transform((val) => parseInt(val))
      .refine((val) => val >= 0),
  ),
  offset: z.optional(
    z
      .string()
      .transform((val) => parseInt(val))
      .refine((val) => val >= 0),
  ),
  locale: z.optional(z.string()),
});

export async function GET(request: NextRequest) {
  const params = query.parse(parse(request.nextUrl.search.slice(1)));

  const categories = await prisma.categories.findMany({
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
      language: {
        select: {
          name: true,
          code: true,
        },
      },
      templates: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return NextResponse.json(categories);
}
