import type { MetadataRoute } from "next";
import { getPageMetadataCollection } from "lib/data/page";
import { www } from "lib/utils/url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPageMetadataCollection();

  return pages.map((page) => ({
    url: www(page.href.slice(1)),
    lastModified: page.updatedAt,
  }));
}
