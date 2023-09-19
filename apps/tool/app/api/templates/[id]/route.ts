import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@lib/utils/prisma";

type TemplateCompletionContext = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, props: TemplateCompletionContext) {
  return NextResponse.json(
    await prisma.template.findMany({
      where: { id: parseInt(props.params.id) },
      include: {
        context: true,
      },
    }),
  );
}
