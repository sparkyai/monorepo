export type DonationLink = null | {
  page: {
    slug: string | null;
    locale: string;
  };
  label: string;
};
