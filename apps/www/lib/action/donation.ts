"use server";

import api from "lib/data/api";

type DonationData = {
  ccy: number;
  name: string;
  email: string;
  amount: number;
  message?: string;
};

type Invoice = {
  pageUrl: string;
  invoiceId: string;
};

export async function createDonation(data: DonationData) {
  const response = await fetch("https://api.monobank.ua/api/merchant/invoice/create", {
    body: JSON.stringify({
      ccy: data.ccy,
      amount: data.amount * 100,
      webHookUrl: `${process.env.API_URL}/webhook/monobank`,
      redirectUrl: `${process.env.WWW_URL}/gratitude`,
    }),
    method: "POST",
    headers: {
      "X-Token": process.env.MONOBANK_API_KEY || "",
    },
  });

  if (!response.ok) {
    throw new Error("Monobank Internal Error");
  }

  const invoice: Invoice = await response.json();

  await api.post("/donations", {
    ccy: data.ccy,
    name: data.name,
    email: data.email,
    amount: data.amount,
    message: data.message || void 0,
    invoiceId: invoice.invoiceId,
  });

  return invoice.pageUrl;
}
