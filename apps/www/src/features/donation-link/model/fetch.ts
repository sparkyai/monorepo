import sparky from "shared/api/sparky";
import type { DonationLink } from "../types";

export async function fetchDonationLink(locale: string): Promise<DonationLink> {
  return sparky.get(`/donation-link?locale=${locale}`);
}
