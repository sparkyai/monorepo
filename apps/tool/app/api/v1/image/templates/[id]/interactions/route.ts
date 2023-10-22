import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@lib/utils/prisma";
import { interaction } from "@lib/utils/schema";
import { handler } from "@app/api/v1/interaction";

export const revalidate = 0;

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function POST(request: NextRequest, props: TemplateProps) {
  const data = interaction.parse(await request.json());

  await handler(data, parseInt(props.params.id), prisma.image_templates);

  return new NextResponse();
}
