import type { MetadataRoute, ServerRuntime } from "next";
import { fetchPagesMetadata } from "entities/page";
import { www } from "shared/lib/url";

export const runtime: ServerRuntime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await fetchPagesMetadata();

  return pages.map((page) => ({
    url: www(page.href.slice(1)),
    lastModified: page.updatedAt,
  }));
}
