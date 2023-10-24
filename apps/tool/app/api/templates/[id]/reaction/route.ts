import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@lib/utils/prisma";
import { handler } from "@app/api/v1/interaction";

const reaction = z.object({
  liked: z.boolean(),
  client: z.object({
    id: z.number().positive(),
  }),
});

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, props: TemplateProps) {
  const input = reaction.parse(await request.json());

  const data = {
    type: input.liked ? "like" : "dislike",
    client: input.client,
  } as const;

  await handler(data, parseInt(props.params.id), prisma.text_templates);

  return new NextResponse();
}
