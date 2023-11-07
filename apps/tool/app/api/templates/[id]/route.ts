import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@lib/utils/prisma";
import { getTemplateParameters } from "@lib/utils/model";

export const revalidate = 0;

type TemplateCompletionContext = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, props: TemplateCompletionContext) {
  const template = await prisma.text_templates.findUniqueOrThrow({
    where: { id: parseInt(props.params.id) },
    select: {
      id: true,
      name: true,
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
          language: {
            select: {
              code: true,
              name: true,
            },
          },
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
    },
  });

  return NextResponse.json({
    id: template.id,
    name: template.name,
    context: template.messages,
    language: template.language,
    ...template.parameters,
    parameters: getTemplateParameters(template.messages),
  });
}
