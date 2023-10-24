import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@lib/utils/prisma";
import { base, poster, language, parameters, message } from "@lib/utils/schema";

export const revalidate = 0;

const output = base.extend({
  poster: z.nullable(poster),
  messages: z.array(message),
  category: base,
  language,
  parameters,
  description: z.nullable(z.string()),
});

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, props: TemplateProps) {
  const template = await prisma.text_templates.findUniqueOrThrow({
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
      messages: {
        select: {
          role: true,
          content: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      language: {
        select: {
          code: true,
          name: true,
        },
      },
      parameters: {
        select: {
          model: true,
          top_p: true,
          temperature: true,
          present_penalty: true,
          frequency_penalty: true,
        },
      },
      description: true,
    },
  });

  return NextResponse.json(output.parse(template));
}
