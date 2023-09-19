import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { StrapiEntity } from "lib/utils/strapi";
import strapi, { getEntityData } from "lib/utils/strapi";

type Feedback = StrapiEntity<{
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}>;

export async function POST(request: NextRequest) {
  const response = await strapi.post<Feedback>("feedbacks", await request.json());

  return NextResponse.json(getEntityData(response.data));
}
