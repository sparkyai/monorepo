import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";

export const revalidate = 0;

type UsageProps = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, props: UsageProps) {
  try {
    const usage = await prisma.image_template_usage.findUnique({
      where: { id: props.params.id },
      select: {
        id: true,
        type: true,
        prompt: true,
        tokens: true,
        resolution: true,
      },
    });

    return NextResponse.json({ data: usage }, { status: usage ? 200 : 404 });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
}
