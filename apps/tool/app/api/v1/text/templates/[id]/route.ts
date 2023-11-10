import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";
import { getPosterUrl } from "@lib/utils/data";
import { getTemplateParameters } from "@lib/utils/model";

export const revalidate = 0;

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, props: TemplateProps) {
  try {
    const template = await prisma.text_templates.findUnique({
      where: {
        id: Number(props.params.id),
      },
      select: {
        id: true,
        name: true,
        poster: {
          select: {
            mime: true,
            width: true,
            height: true,
            pathname: true,
          },
        },
        messages: {
          select: {
            role: true,
            content: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        language: {
          select: {
            code: true,
            name: true,
          },
        },
        parameters: {
          select: {
            model: true,
            top_p: true,
            temperature: true,
            present_penalty: true,
            frequency_penalty: true,
          },
        },
        description: true,
      },
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- -
    // @ts-expect-error
    template.input = getTemplateParameters(template.messages);

    if (template?.poster) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- -
      // @ts-expect-error
      template.poster.url = getPosterUrl(template.poster.pathname);
    }

    return NextResponse.json({ data: template }, { status: template ? 200 : 404 });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
}
