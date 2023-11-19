import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import prisma from "@lib/utils/prisma";
import { getObjectUrl } from "@lib/utils/s3";
import { withTokenVerify } from "@lib/utils/validate";

export const revalidate = 0;

type RoleProps = {
  params: {
    id: string;
  };
};

export const GET = withTokenVerify(async function GET(_: NextRequest, props: RoleProps) {
  try {
    const role = await prisma.chat_roles.findUnique({
      where: { id: Number(props.params.id) },
      select: {
        id: true,
        name: true,
        poster: {
          select: {
            mime: true,
            width: true,
            height: true,
            s3_key: true,
          },
        },
        prompt: true,
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

    if (role?.poster) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- -
      // @ts-expect-error
      role.poster.url = getObjectUrl(role.poster.s3_key);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- -
      // @ts-expect-error
      delete role.poster.s3_key;
    }

    return NextResponse.json({ data: role }, { status: role ? 200 : 404 });
  } catch (error) {
    // eslint-disable-next-line no-console -- console.error(error);
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json({ error: { _errors: [] } }, { status: 500 });
  }
});
