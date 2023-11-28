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
  prompt: z.string().min(1),
  tokens: z.number().nonnegative(),
  telegram: z.object({
    user: TelegramUserSchema.pick({
      id: true,
    }),
  }),
  resolution: z.string().regex(/\d+x\d+/),
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
    const usage = await prisma.image_template_usage.create({
      data: {
        type: "regenerate",
        user: {
          connect: payload.data.telegram.user,
        },
        prompt: payload.data.prompt,
        tokens: payload.data.tokens,
        template: {
          connect: { id: Number(props.params.id) },
        },
        resolution: payload.data.resolution,
      },
      select: { id: true },
    });

    await updateUserExtraTokens(payload.data.telegram.user.id, payload.data.tokens);

    return NextResponse.json({ data: usage });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
});
