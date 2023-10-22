import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@lib/utils/prisma";
import { getTemplateParameters } from "@lib/utils/model";
import { base, message, language, parameters } from "@lib/utils/schema";

export const revalidate = 0;

const output = base.extend(parameters.shape).extend({
  context: z.array(message),
  language,
  parameters: z.array(z.string()),
});

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

  const response = {
    id: template.id,
    name: template.name,
    context: template.messages,
    language: template.language,
    ...template.parameters,
    parameters: getTemplateParameters(template.messages),
  };

  return NextResponse.json(output.parse(response));
}
