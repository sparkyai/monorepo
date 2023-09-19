import { notFound } from "next/navigation";
import api from "./api";

type Page = {
  id: number;
  seo: SeoData;
  name: string;
  slug: string;
  title: string;
  locale: string;
  content: Section[] | string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  localizations: Localization[];
};

type Image = {
  src: string;
  alt: string;
  name: string;
  mime: string;
  width: number;
  height: number;
  placeholder: string;
};

type SeoData = {
  image: Image;
  title: string;
  description: string;
};

type Section = {
  id: string;
  type: string;
  params: Record<string, unknown>;
};

type Localization = {
  id: number;
  name: string;
  href: string;
  slug: string;
  locale: string;
};

export async function getPageData(slug: string[], locale: string): Promise<Page> {
  if (slug.length < 2) {
    slug.unshift("pages");
  }

  return api.get<Page>(`/content/${slug.filter(Boolean).join("/")}?locale=${locale}`).catch(() => {
    notFound();
  });
}

export async function getPageMetadataCollection() {
  return api.get<{ href: string; updatedAt: string }[]>("/pages/metadata");
}
