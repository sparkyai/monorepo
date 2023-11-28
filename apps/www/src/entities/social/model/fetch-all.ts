import sparky from "shared/api/sparky";
import type { Social } from "../types";

export async function fetchAllSocials(locale: string): Promise<Social[]> {
  return sparky.get(`/socials?locale=${locale}`);
}
