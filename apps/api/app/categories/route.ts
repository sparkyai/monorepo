import { NextResponse } from "next/server";
import type { ServerRuntime } from "next";
import tool from "lib/utils/tool";

export const runtime: ServerRuntime = "edge";

export async function GET() {
  return NextResponse.json(await tool.get<object[]>("categories"));
}
