import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";
import { UserSchema } from "@lib/utils/schema";

export const revalidate = 0;

const PayloadSchema = z.object({
  telegram: z.object({
    user: UserSchema.pick({
      id: true,
    }),
  }),
});

type RoleProps = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, props: RoleProps) {
  const payload = PayloadSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.format() }, { status: 500 });
  }

  try {
    await prisma.chat_role_reactions.upsert({
      where: {
        user_id_role_id: {
          user_id: payload.data.telegram.user.id,
          role_id: parseInt(props.params.id),
        },
      },
      update: {
        type: "like",
      },
      create: {
        type: "like",
        user: {
          connect: payload.data.telegram.user,
        },
        role: {
          connect: { id: parseInt(props.params.id) },
        },
      },
      select: { id: true },
    });

    return NextResponse.json({ data: null });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
}
