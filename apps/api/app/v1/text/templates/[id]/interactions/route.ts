import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { ServerRuntime } from "next";
import tool from "lib/utils/tool";

export const runtime: ServerRuntime = "edge";

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function POST(request: NextRequest, props: TemplateProps) {
  await tool.post(`v1/text/templates/${props.params.id}/interactions${request.nextUrl.search}`, await request.json());

  return new NextResponse();
}
