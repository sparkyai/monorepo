"use server";

import api from "lib/data/api";

type DonationData = {
  ccy: number;
  name: string;
  email: string;
  amount: number;
  message?: string;
};

export async function createDonation(data: DonationData) {
  const { url } = await api.post<{ url: string }>("/donations", data);

  return url;
}
