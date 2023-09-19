import type { ServerRuntime } from "next";
import { NextResponse } from "next/server";
import type { StrapiEntity, StrapiEntityRelation } from "lib/utils/strapi";
import strapi, { getEntityData } from "lib/utils/strapi";

export const runtime: ServerRuntime = "edge";

type Page = StrapiEntity<{
  slug: string | null;
  locale: string;
  updatedAt: string;
  localizations: StrapiEntityRelation<Omit<Page, "localizations">[]>;
}>;

export async function GET() {
  const pages: object[] = [];

  for (const space of ["pages", "legals", "features"]) {
    let page = 1;
    let lastPage = 1;

    while (page <= lastPage) {
      // eslint-disable-next-line no-await-in-loop -- controlled
      const { data, meta } = await strapi.get<Page[]>(
        `${space}?fields[]=slug&fields[]=locale&&fields[]=updatedAt&populate[localizations][fields][]=slug&populate[localizations][fields][]=locale&populate[localizations][fields][]=updatedAt&pagination[page]=${page}&pagination[pageSize]=2`,
      );

      for (const item of data) {
        const pageData = getEntityData(item);
        const localizations = pageData.localizations.data?.map(getEntityData) || [];

        for (const localization of [pageData, ...localizations]) {
          const slug = localization.slug ? `/${localization.slug}` : "";

          pages.push({
            href: `/${localization.locale}/${space}${slug}`.replace("/pages", ""),
            updatedAt: localization.updatedAt,
          });
        }
      }

      page++;
      if (meta?.pagination) {
        lastPage = meta.pagination.pageCount;
      }
    }
  }

  return NextResponse.json(pages);
}
