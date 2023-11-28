import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";
import { TelegramUserSchema } from "@lib/utils/schema";
import { withTokenVerify } from "@lib/utils/validate";
import { updateUserExtraTokens } from "@lib/data/telegram/user";

export const revalidate = 0;

const PayloadSchema = z.object({
  input: z.record(z.string().min(1)),
  prompt: z.string().min(1),
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

export const PUT = withTokenVerify(async function PUT(request: NextRequest, props: TemplateProps) {
  const payload = PayloadSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.format() }, { status: 500 });
  }

  try {
    const usage = await prisma.text_template_usage.create({
      data: {
        type: "regenerate",
        user: {
          connect: payload.data.telegram.user,
        },
        input: payload.data.input,
        prompt: payload.data.prompt,
        template: {
          connect: { id: Number(props.params.id) },
        },
        prompt_tokens: payload.data.prompt_tokens,
        completion_tokens: payload.data.completion_tokens,
      },
      select: { id: true },
    });

    await updateUserExtraTokens(payload.data.telegram.user.id, payload.data.completion_tokens);

    return NextResponse.json({ data: usage });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
});
