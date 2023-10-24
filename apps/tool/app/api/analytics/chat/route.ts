import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parse } from "qs";
import type { TypeOf } from "zod";
import { z } from "zod";
import prisma from "@lib/utils/prisma";
import type { interaction } from "@lib/utils/schema";

export const revalidate = 0;

const input = z.object({
  period: z.enum(["day", "week", "month", "year"]),
});

const fields = {
  day: "hour",
  week: "hour", // 8 hour
  month: "day",
  year: "week",
};

const role = z.object({
  id: z.number(),
  name: z.string(),
});

const output = z.object({
  top: z.array(role),
  analytics: z.array(
    z.object({
      like: z.number().nonnegative(),
      dislike: z.number().nonnegative(),
      generate: z.number().nonnegative(),
      regenerate: z.number().nonnegative(),
      updated_at: z.date(),
    }),
  ),
});

type Interaction = TypeOf<typeof interaction> & {
  count: bigint;
  updated_at: Date;
};

export async function GET(request: NextRequest) {
  const params = input.parse(parse(request.nextUrl.search.slice(1)));
  const interval = `1 ${params.period}`;

  const [interactions, roles] = await Promise.all([
    prisma.$queryRaw<Interaction[]>`
        SELECT type, count(*), date_trunc(${fields[params.period]}, updated_at) updated_at
        FROM public.chat_role_interactions i
        WHERE created_at > now() - ${interval}::INTERVAL
        GROUP BY 1, 3
        ORDER BY 3
    `,
    prisma.$queryRaw<TypeOf<typeof role>[]>`
        SELECT r.id, r.name
        FROM public.chat_role_interactions i
                 JOIN public.chat_roles r on r.id = i.role_id
        WHERE created_at > now() - ${interval}::INTERVAL
        GROUP BY 1, 2
        ORDER BY count (*) DESC
            LIMIT 3
    `,
  ]);

  const analytics: Record<string, TypeOf<typeof output>["analytics"][number]> = {};

  for (const interaction of interactions) {
    const date = interaction.updated_at.toString();

    if (!(date in analytics)) {
      analytics[date] = {
        like: 0,
        dislike: 0,
        generate: 0,
        regenerate: 0,
        updated_at: interaction.updated_at,
      };
    }

    analytics[date][interaction.type] += Number(interaction.count);
  }

  return NextResponse.json(output.parse({ top: roles, analytics: Object.values(analytics) }));
}
