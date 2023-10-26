import type { MetadataRoute } from "next";
import { www } from "lib/utils/url";

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: { allow: "/" },
    sitemap: www("sitemap.xml"),
  };
}
