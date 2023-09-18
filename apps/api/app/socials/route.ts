import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { ServerRuntime } from "next";
import { pickSearchParams } from "lib/utils/query";
import type { StrapiEntity } from "lib/utils/strapi";
import strapi, { getEntityData } from "lib/utils/strapi";

export const runtime: ServerRuntime = "edge";

type Social = StrapiEntity<{
  url: string;
  name: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
}>;

export async function GET(request: NextRequest) {
  const search = pickSearchParams(request.nextUrl.searchParams, "locale");

  const { data } = await strapi.get<Social[]>(`socials?${search.toString()}`);

  return NextResponse.json(data.map(getEntityData));
}
