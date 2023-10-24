import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@lib/utils/prisma";
import { handler } from "@app/api/v1/interaction";

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function PUT(_: NextRequest, props: TemplateProps) {
  const data = {
    type: "regenerate" as const,
    client: {
      id: -1,
    },
  };

  await handler(data, parseInt(props.params.id), prisma.text_templates);

  return new NextResponse();
}
