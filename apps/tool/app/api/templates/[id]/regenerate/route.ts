import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@lib/utils/prisma";

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function PUT(_: NextRequest, props: TemplateProps) {
  await prisma.text_template_usage.create({
    data: {
      type: "regenerate",
      user: {
        connect: { id: 0 },
      },
      tokens: 0,
      template: {
        connect: { id: parseInt(props.params.id) },
      },
    },
    select: { id: true },
  });

  return new NextResponse();
}
