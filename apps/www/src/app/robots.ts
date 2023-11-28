import type { MetadataRoute, ServerRuntime } from "next";
import { www } from "shared/lib/url";

export const runtime: ServerRuntime = "edge";

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: { allow: "/" },
    sitemap: www("sitemap.xml"),
  };
}
