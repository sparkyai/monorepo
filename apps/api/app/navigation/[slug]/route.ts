import type { ServerRuntime } from "next";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "@sparky/env";
import { pickSearchParams } from "lib/utils/query";

export const runtime: ServerRuntime = "edge";

type NavigationContext = {
  params: {
    slug: string;
  };
};

export async function GET(request: NextRequest, context: NavigationContext) {
  const search = pickSearchParams(request.nextUrl.searchParams, "type", "locale");
  const response = await fetch(
    `${env("STRAPI_URL")}/api/navigation/render/${context.params.slug}?${search.toString()}`,
  );

  return NextResponse.json(getItems(await response.json()));
}

type Item = {
  id: unknown;
  path: unknown;
  title: unknown;
  order: number;
  items?: Item[];
  related: Related | null;
  external: unknown;
  menuAttached: unknown;
};

function getItems(items: Item[]) {
  return items
    .filter((item) => item.menuAttached && (!item.related || item.related.publishedAt))
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      id: item.id,
      path: item.path,
      title: item.title,
      items: item.items && getItems(item.items),
      related: getRelated(item.related),
      external: item.external,
    }));
}

type Related = {
  name: string;
  slug: string;
  locale: string;
  publishedAt: unknown;
  __contentType: string;
};

function getRelated(related?: Related | null) {
  if (related) {
    let href: string;

    switch (related.__contentType) {
      case "api::page.page":
        href = related.slug ? `/${related.locale}/${related.slug}` : `/${related.locale}`;
        break;
      case "api::legal.legal":
        href = related.slug ? `/${related.locale}/legals/${related.slug}` : `/${related.locale}/legals`;
        break;
      case "api::feature.feature":
        href = related.slug ? `/${related.locale}/features/${related.slug}` : `/${related.locale}/features`;
        break;
      default:
        return null;
    }

    return { href, name: related.name };
  }

  return null;
}
