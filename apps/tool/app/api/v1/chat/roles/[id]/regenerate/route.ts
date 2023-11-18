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
  prompt_tokens: z.number().nonnegative().int(),
  completion_tokens: z.number().nonnegative().int(),
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
    const usage = await prisma.chat_role_usage.create({
      data: {
        type: "regenerate",
        user: {
          connect: payload.data.telegram.user,
        },
        role: {
          connect: { id: Number(props.params.id) },
        },
        prompt_tokens: payload.data.prompt_tokens,
        completion_tokens: payload.data.completion_tokens,
      },
      select: { id: true },
    });

    return NextResponse.json({ data: usage });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
}
