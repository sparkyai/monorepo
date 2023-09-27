import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { StrapiEntity } from "lib/utils/strapi";
import strapi, { getEntityData } from "lib/utils/strapi";

type MonobankWebhookPayload = {
  ccy: string;
  amount: number;
  status: string;
  invoiceId: string;
  modifiedDate: string;
};

type Donation = StrapiEntity<{
  modifiedDate: string;
}>;

export async function POST(request: NextRequest) {
  const payload: MonobankWebhookPayload = await request.json();
  const { data } = await strapi.get<Donation[]>(`donations?filters[invoiceId][$eq]=${payload.invoiceId}`);

  if (data.length) {
    const donation = getEntityData(data[0]);

    if (!donation.modifiedDate || timestamp(donation.modifiedDate) < timestamp(payload.modifiedDate)) {
      await strapi.put(`donations/${donation.id}`, {
        modifiedDate: payload.modifiedDate,
        status: payload.status,
      });
    }
  }

  return NextResponse.json({ done: true });
}

function timestamp(date: string) {
  return new Date(date).valueOf();
}
