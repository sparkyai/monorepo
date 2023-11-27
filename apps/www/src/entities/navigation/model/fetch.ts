import sparky from "shared/api/sparky";
import type { NavigationItem } from "../types";

export async function fetchNavigation(name: string, locale: string) {
  return sparky.get<NavigationItem[]>(`/navigation/${name}?locale=${locale}&type=TREE`);
}
