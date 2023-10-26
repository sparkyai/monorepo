import type { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: { allow: "/" },
    sitemap: `${process.env.WWW_URL}/sitemap.xml`,
  };
}
