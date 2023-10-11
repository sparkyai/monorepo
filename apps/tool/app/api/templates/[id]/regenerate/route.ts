import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@lib/utils/prisma";

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function PUT(_: NextRequest, props: TemplateProps) {
  await prisma.templates.update({
    where: { id: parseInt(props.params.id) },
    data: {
      regenerated: {
        increment: 1,
      },
    },
  });

  return NextResponse.json({ done: true });
}
