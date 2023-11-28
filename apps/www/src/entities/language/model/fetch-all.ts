import sparky from "shared/api/sparky";
import type { Language } from "../types";

export async function fetchAllLanguages(): Promise<Language[]> {
  return sparky.get("/locales");
}
