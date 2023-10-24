import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { ServerRuntime } from "next";
import tool from "lib/utils/tool";

export const runtime: ServerRuntime = "edge";

type RoleProps = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, props: RoleProps) {
  return NextResponse.json(await tool.get<object[]>(`v1/chat/roles/${props.params.id}${request.nextUrl.search}`));
}
