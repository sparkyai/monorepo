import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@lib/utils/prisma";

const reaction = z.object({
  liked: z.boolean(),
  client: z.object({
    id: z.number().int(),
  }),
});

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, props: TemplateProps) {
  const data = reaction.parse(await request.json());

  await prisma.template_reactions.upsert({
    where: {
      clients_id_templates_id: {
        clients_id: data.client.id,
        templates_id: parseInt(props.params.id),
      },
    },
    update: {
      liked: data.liked,
    },
    create: {
      liked: data.liked,
      client: {
        create: {
          id: data.client.id,
        },
      },
      template: {
        connect: {
          id: parseInt(props.params.id),
        },
      },
    },
  });

  return NextResponse.json({ done: true });
}
