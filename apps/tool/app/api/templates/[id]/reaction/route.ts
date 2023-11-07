import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@lib/utils/prisma";

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

  await prisma.text_template_reactions.upsert({
    where: {
      user_id_template_id: {
        user_id: input.client.id,
        template_id: parseInt(props.params.id),
      },
    },
    update: {
      type: input.liked ? "like" : "dislike",
    },
    create: {
      type: input.liked ? "like" : "dislike",
      user: {
        connect: input.client,
      },
      template: {
        connect: { id: parseInt(props.params.id) },
      },
    },
    select: { id: true },
  });

  return new NextResponse();
}
