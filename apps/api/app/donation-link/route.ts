import type { ServerRuntime } from "next";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { stringify } from "qs";
import type { StrapiEntity, StrapiEntityRelation } from "lib/utils/strapi";
import strapi, { getEntityData } from "lib/utils/strapi";

export const runtime: ServerRuntime = "edge";

type DonationLinkData = StrapiEntity<{
  label: string;
  page: StrapiEntityRelation<
    StrapiEntity<{
      slug: string | null;
      locale: string;
    }>
  >;
}>;

export async function GET(request: NextRequest) {
  const query = stringify(
    {
      locale: request.nextUrl.searchParams.get("locale"),
      // populate: "*",
      populate: ["page"],
    },
    {
      skipNulls: true,
      addQueryPrefix: true,
      encodeValuesOnly: true,
    },
  );

  try {
    const { data } = await strapi.get<DonationLinkData>(`donation-link${query}`);
    const link = getEntityData(data);

    if (link.label && link.page.data) {
      const page = getEntityData(link.page.data);

      return NextResponse.json({ label: link.label, page });
    }
  } catch {
    //
  }

  return NextResponse.json(null);
}
