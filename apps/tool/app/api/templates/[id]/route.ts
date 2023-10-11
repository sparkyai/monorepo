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
  const templates = await prisma.templates.findMany({
    where: { id: parseInt(props.params.id) },
    select: {
      id: true,
      name: true,
      model: true,
      top_p: true,
      context: {
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
      temperature: true,
      present_penalty: true,
      frequency_penalty: true,
    },
  });

  if (!templates.length) {
    throw new Error("Template not found.");
  }

  const parameters = getTemplateParameters(templates[0].context);

  return NextResponse.json({
    ...templates[0],
    parameters,
  });
  // return NextResponse.json(
  //   templates.map((template) => {
  //     const item: Record<string, unknown> = { ...template };
  //     item.topP = template.top_p;
  //     item.presentPenalty = template.present_penalty;
  //     item.frequencyPenalty = template.frequency_penalty;
  //
  //     item.parameters = getTemplateParameters(template.context);
  //
  //     delete item.top_p;
  //     delete item.present_penalty;
  //     delete item.frequency_penalty;
  //
  //     return item;
  //   }),
  // );
}
