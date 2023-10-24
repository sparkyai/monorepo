import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@lib/utils/prisma";
import { base, poster, language } from "@lib/utils/schema";

export const revalidate = 0;

const output = base.extend({
  model: z.nullable(z.string()),
  poster: z.nullable(poster),
  provider: z.string(),
  language,
  description: z.nullable(z.string()),
});

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

  return NextResponse.json(output.parse(template));
}
