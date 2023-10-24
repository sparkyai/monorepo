import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@lib/utils/prisma";
import { base, language, parameters, poster } from "@lib/utils/schema";

export const revalidate = 0;

const output = base.extend({
  poster: z.nullable(poster),
  prompt: z.string(),
  category: base,
  language,
  parameters,
  description: z.nullable(z.string()),
});

type RoleProps = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, props: RoleProps) {
  const role = await prisma.chat_roles.findUniqueOrThrow({
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
      prompt: true,
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

  return NextResponse.json(output.parse(role));
}
