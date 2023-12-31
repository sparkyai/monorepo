import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { env } from "@sparky/env";

export async function POST() {
  revalidateTag("strapi");

  await revalidate(`${env("WWW_URL")}/api/revalidate`, ["api"]);

  return new NextResponse();
}

async function revalidate(url: string, tags: string[]) {
  return fetch(url, { body: JSON.stringify({ tags }), method: "POST" }).catch(() => void 0);
}
