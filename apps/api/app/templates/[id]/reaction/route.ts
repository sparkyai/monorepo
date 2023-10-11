import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import tool from "lib/utils/tool";

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, props: TemplateProps) {
  return NextResponse.json(await tool.put<object>(`templates/${props.params.id}/reaction`, await request.json()));
}
