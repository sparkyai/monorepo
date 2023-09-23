import type { ServerRuntime } from "next";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { stringify } from "qs";
import type { StrapiComponent, StrapiEntity, StrapiEntityRelation, StrapiImage } from "lib/utils/strapi";
import strapi, { getEntityData, getImageData } from "lib/utils/strapi";

export const runtime: ServerRuntime = "edge";

type Page = StrapiEntity<{
  seo: {
    title: string;
    image: StrapiEntityRelation<StrapiEntity<StrapiImage>>;
    description: string;
  };
  name: string;
  slug: string | null;
  locale: string;
  content: StrapiComponent<Record<string, unknown>>[] | string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  localizations: StrapiEntityRelation<Omit<Page, "seo" | "content" | "localizations">[]>;
}>;

type NavigationContext = {
  params: {
    slug: string[];
  };
};

export async function GET(request: NextRequest, context: NavigationContext) {
  const [space, slug] = context.params.slug;
  const query = stringify(
    {
      locale: request.nextUrl.searchParams.get("locale"),
      filters: {
        slug: slug ? { $eq: slug } : { $null: true },
      },

      populate: [
        "seo",
        "seo.image",
        "content",
        "content.info",
        "content.page",
        "content.form",
        "content.form.image",
        "content.legal",
        "content.media",
        "content.variants",
        "content.cards",
        "content.cards.image",
        "content.cards.feature",
        "content.header",
        "content.models",
        "content.models.tooltip",
        "content.banner",
        "content.banner.media",
        "content.banner.action",
        "content.banner.action.app",
        "content.banner.action.page",
        "content.banner.action.legal",
        "content.banner.action.social",
        "content.banner.action.feature",
        "content.feature",
        "content.contacts",
        "content.contacts.icon",
        "content.products",
        "content.products.prices",
        "content.products.prices.model",
        "content.templates",
        "content.templates.icon",
        "content.questions",
        "content.advantages",
        "content.advantages.icon",
        "content.categories",
        "content.categories.preview",
        "content.categories.primary",
        "content.categories.primary.icon",
        "content.categories.category",
        "content.categories.category.review",
        "content.categories.category.review.author",
        "content.categories.category.review.author.avatar",
        "content.categories.templates",
        "content.categories.templates.icon",
        "localizations",
      ],
    },
    {
      skipNulls: true,
      addQueryPrefix: true,
      encodeValuesOnly: true,
    },
  );

  const { data } = await strapi.get<Page[]>(`${space}${query}`);

  if (data.length < 1) {
    throw new Error("Content not found.");
  }

  const page = getEntityData(data[0]);
  const localizations = page.localizations.data?.map(getEntityData) || [];
  localizations.push(page);

  return NextResponse.json({
    ...page,
    seo: {
      ...page.seo,
      image: page.seo.image.data ? getImageData(page.seo.image.data) : null,
    },
    content: typeof page.content === "object" ? page.content.map(getComponentData) : page.content,
    localizations: localizations
      .map((translation) => getLocalization(space, translation))
      .sort((a, b) => a.locale.localeCompare(b.locale)),
  });
}

type Translation = {
  id: number;
  name: string;
  slug: string | null;
  locale: string;
};

function getLocalization(space: string, translation: Translation) {
  const slug = translation.slug ? `/${translation.slug}` : "";

  return {
    id: translation.id,
    name: translation.name,
    slug: translation.slug,
    href: `/${translation.locale}/${space}${slug}`.replace("/pages", ""),
    locale: translation.locale,
  };
}

function getComponentData(component: StrapiComponent<Record<string, unknown>>) {
  const { id, __component, ...props } = component;
  const params: Record<string, unknown> = {};

  for (const name in props) {
    params[name] = getNestedEntityData(props[name]);
  }

  return { id, type: __component.replace("page.", ""), params };
}

function getNestedEntityData(value: unknown) {
  if (Array.isArray(value)) {
    return value.map(getNestedEntityData);
  }

  if (typeof value === "object" && value) {
    if ("data" in value) {
      return getNestedEntityData(value.data);
    }

    if ("attributes" in value && typeof value.attributes === "object" && value.attributes) {
      if ("mime" in value.attributes) {
        return getImageData(value as StrapiEntity<StrapiImage>);
      }

      // eslint-disable-next-line no-param-reassign -- controlled
      value = getEntityData(value as StrapiEntity<unknown>);
    }

    for (const name in value as object) {
      (value as object)[name] = getNestedEntityData((value as object)[name]);
    }
  }

  return value;
}
