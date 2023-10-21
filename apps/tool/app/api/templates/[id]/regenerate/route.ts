import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@lib/utils/prisma";

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function PUT(_: NextRequest, props: TemplateProps) {
  await prisma.text_templates.update({
    data: {
      interactions: {
        create: {
          type: "generate",
          client: {
            connectOrCreate: {
              where: {
                id: 0,
              },
              create: {
                id: 0,
              },
            },
          },
        },
      },
    },
    where: { id: parseInt(props.params.id) },
    select: {
      id: true,
    },
  });

  return new NextResponse();
}
