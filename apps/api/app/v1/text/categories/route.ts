import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { ServerRuntime } from "next";
import tool from "lib/utils/tool";

export const runtime: ServerRuntime = "edge";

export async function GET(request: NextRequest) {
  return NextResponse.json(await tool.get<object[]>(`v1/text/categories${request.nextUrl.search}`));
}
