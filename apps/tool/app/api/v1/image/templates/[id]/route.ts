import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@lib/utils/prisma";

export const revalidate = 0;

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, props: TemplateProps) {
  const template = await prisma.image_templates.findUniqueOrThrow({
    where: {
      id: parseInt(props.params.id),
    },
    select: {
      id: true,
      name: true,
      poster: {
        select: {
          url: true,
        },
      },
      model: true,
      provider: true,
      language: {
        select: {
          code: true,
          name: true,
        },
      },
      description: true,
    },
  });

  return NextResponse.json(template);
}
