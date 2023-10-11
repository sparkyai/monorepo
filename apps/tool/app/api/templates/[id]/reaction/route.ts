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
      client_id_template_id: {
        client_id: data.client.id,
        template_id: parseInt(props.params.id),
      },
    },
    update: {
      liked: data.liked,
    },
    create: {
      liked: data.liked,
      client: {
        connectOrCreate: {
          where: {
            id: data.client.id,
          },
          create: {
            id: data.client.id,
          },
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
