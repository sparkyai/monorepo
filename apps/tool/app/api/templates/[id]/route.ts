import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@lib/utils/prisma";

export const revalidate = 0;

type TemplateCompletionContext = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, props: TemplateCompletionContext) {
  return NextResponse.json(
    await prisma.template.findMany({
      where: { id: parseInt(props.params.id) },
      include: {
        context: true,
      },
    }),
  );
}
