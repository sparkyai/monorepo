import sparky from "shared/api/sparky";
import type { Page } from "../types";

export async function fetchPageBySlug(locale: string, ...path: string[]): Promise<Page> {
  if (path.length < 2) {
    path.unshift("pages");
  }

  return sparky.get(`/content/${path.join("/")}?locale=${locale}`);
}
