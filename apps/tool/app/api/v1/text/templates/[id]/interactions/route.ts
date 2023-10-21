import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@lib/utils/prisma";

export const revalidate = 0;

const interaction = z.object({
  type: z.enum(["like", "dislike", "generate"]),
  client: z.object({
    id: z.number().positive(),
  }),
});

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function POST(request: NextRequest, props: TemplateProps) {
  const data = interaction.parse(await request.json());

  if (data.type === "generate") {
    await prisma.text_templates.update({
      data: {
        interactions: {
          create: {
            type: "generate",
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
          },
        },
      },
      where: {
        id: parseInt(props.params.id),
      },
      select: {
        id: true,
      },
    });
  } else {
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
          type: data.type,
        },
        where: {
          id: interactions[0].id,
        },
      });
    } else {
      await prisma.interactions.create({
        data: {
          type: data.type,
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
  }

  return new NextResponse();
}
