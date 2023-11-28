import { NextResponse } from "next/server";
import type { ServerRuntime } from "next";
import { env } from "@sparky/env";

export const runtime: ServerRuntime = "edge";

export async function GET() {
  const response = await fetch(`${env("STRAPI_URL")}/api/i18n/locales`);

  return NextResponse.json(await response.json());
}
