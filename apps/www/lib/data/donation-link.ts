import api from "./api";

type FooterData = null | {
  page: {
    slug: string | null;
    locale: string;
  };
  label: string;
};

export async function getDonationLinkData(locale: string) {
  return api.get<FooterData>(`/donation-link?locale=${locale}`);
}
