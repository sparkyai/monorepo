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

const output = z.array(
  z.object({
    like: z.number().nonnegative(),
    dislike: z.number().nonnegative(),
    generate: z.number().nonnegative(),
    regenerate: z.number().nonnegative(),
    updated_at: z.date(),
  }),
);

type Interaction = TypeOf<typeof interaction> & {
  count: bigint;
  updated_at: Date;
};

type CategoryProps = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, props: CategoryProps) {
  const params = input.parse(parse(request.nextUrl.search.slice(1)));
  const interval = `1 ${params.period}`;

  const interactions: Interaction[] = await prisma.$queryRaw`
      SELECT type, count(*), date_trunc(${fields[params.period]}, updated_at) updated_at
      FROM public.chat_role_interactions i
               JOIN public.chat_roles r ON r.id = i.role_id
               JOIN public.chat_categories c ON c.id = r.category_id
      WHERE created_at > now() - ${interval}::INTERVAL AND c.id = ${parseInt(props.params.id)}
      GROUP BY 1, 3
      ORDER BY 3
  `;

  const analytics: Record<string, TypeOf<typeof output>[number]> = {};

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

  return NextResponse.json(output.parse(Object.values(analytics)));
}
