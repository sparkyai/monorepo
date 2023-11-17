import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parse } from "qs";
import { AnalyticPeriod } from "@lib/utils/schema";
import { getTextTemplateGenerationUsage } from "@lib/data/analytics";

export const revalidate = 0;

type CategoryProps = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, props: CategoryProps) {
  const period = AnalyticPeriod.parse(parse(request.nextUrl.search.slice(1)).period);

  return NextResponse.json({ data: await getTextTemplateGenerationUsage(Number(props.params.id), period) });
}
