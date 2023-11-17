import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parse } from "qs";
import { AnalyticPeriod } from "@lib/utils/schema";
import { getTokenUsage } from "@lib/data/analytics";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const period = AnalyticPeriod.parse(parse(request.nextUrl.search.slice(1)).period);

  return NextResponse.json({ data: await getTokenUsage(period) });
}
