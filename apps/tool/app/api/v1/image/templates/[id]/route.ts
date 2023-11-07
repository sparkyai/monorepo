import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";

export const revalidate = 0;

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, props: TemplateProps) {
  try {
    const role = await prisma.image_templates.findUnique({
      where: {
        id: parseInt(props.params.id),
      },
      select: {
        id: true,
        name: true,
        poster: {
          select: {
            url: true,
          },
        },
        model: true,
        provider: true,
        language: {
          select: {
            code: true,
            name: true,
          },
        },
        description: true,
      },
    });

    return NextResponse.json({ data: role }, { status: role ? 200 : 404 });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
}
