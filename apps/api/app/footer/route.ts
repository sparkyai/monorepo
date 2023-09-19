import type { ServerRuntime } from "next";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { pickSearchParams } from "lib/utils/query";
import type { StrapiEntity } from "lib/utils/strapi";
import strapi, { getEntityData } from "lib/utils/strapi";

export const runtime: ServerRuntime = "edge";

type FooterData = StrapiEntity<{
  text: string;
}>;

export async function GET(request: NextRequest) {
  const search = pickSearchParams(request.nextUrl.searchParams, "locale");

  const { data } = await strapi.get<FooterData>(`footer?${search.toString()}`);

  return NextResponse.json(getEntityData(data));
}
