import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";
import { TelegramUserSchema } from "@lib/utils/schema";

export const revalidate = 0;

const PayloadSchema = z.object({
  telegram: z.object({
    user: TelegramUserSchema.pick({
      id: true,
    }),
  }),
});

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, props: TemplateProps) {
  const payload = PayloadSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.format() }, { status: 500 });
  }

  try {
    const reaction = await prisma.text_template_reactions.upsert({
      where: {
        user_id_template_id: {
          user_id: payload.data.telegram.user.id,
          template_id: Number(props.params.id),
        },
      },
      update: { type: "dislike" },
      create: {
        type: "dislike",
        user: {
          connect: payload.data.telegram.user,
        },
        template: {
          connect: { id: Number(props.params.id) },
        },
      },
      select: { id: true },
    });

    return NextResponse.json({ data: reaction });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
}
