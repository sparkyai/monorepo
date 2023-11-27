import sparky from "shared/api/sparky";
import type { Footer } from "../types";

export async function fetchFooter(locale: string): Promise<Footer> {
  return sparky.get(`/footer?locale=${locale}`);
}
