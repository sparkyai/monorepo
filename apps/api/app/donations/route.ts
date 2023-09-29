import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { StrapiEntity } from "lib/utils/strapi";
import strapi from "lib/utils/strapi";
import monobank from "lib/utils/monobank";

type Invoice = {
  pageUrl: string;
  invoiceId: string;
};

type DonationData = {
  ccy: number;
  name: string;
  email: string;
  amount: number;
  message?: string;
};

type Donation = StrapiEntity<{
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}>;

export async function POST(request: NextRequest) {
  const data: DonationData = await request.json();
  const invoice = await monobank.post<Invoice>("/merchant/invoice/create", {
    ccy: data.ccy,
    amount: data.amount * 100,
    webHookUrl: `${process.env.API_URL}/webhook/monobank`,
  });

  await strapi.post<Donation>("donations", {
    ...data,
    invoiceId: invoice.invoiceId,
  });

  return NextResponse.json({
    url: invoice.pageUrl,
  });
}
