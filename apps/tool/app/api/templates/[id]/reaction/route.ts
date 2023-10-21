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
  const data = reaction.parse(await request.json());

  const interactions = await prisma.text_templates
    .findUniqueOrThrow({ where: { id: parseInt(props.params.id) } })
    .interactions({
      where: {
        type: {
          in: ["like", "dislike"],
        },
        client: {
          id: data.client.id,
        },
      },
      select: {
        id: true,
        type: true,
      },
    });

  if (interactions.length) {
    await prisma.interactions.update({
      data: {
        type: data.liked ? "like" : "dislike",
      },
      where: {
        id: interactions[0].id,
      },
    });
  } else {
    await prisma.interactions.create({
      data: {
        type: data.liked ? "like" : "dislike",
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
        text_templates: {
          connect: {
            id: parseInt(props.params.id),
          },
        },
      },
    });
  }

  return new NextResponse();
}
