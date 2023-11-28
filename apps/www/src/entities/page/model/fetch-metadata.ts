import sparky from "shared/api/sparky";
import type { PageMetadata } from "../types";

export async function fetchPagesMetadata(): Promise<PageMetadata[]> {
  return sparky.get("/pages/metadata");
}
