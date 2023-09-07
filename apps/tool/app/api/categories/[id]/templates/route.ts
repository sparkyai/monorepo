import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@lib/utils/prisma";

type CategoryTemplatesContext = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, props: CategoryTemplatesContext) {
  const category = await prisma.category.findFirstOrThrow({
    where: {
      id: parseInt(props.params.id),
    },
    select: {
      templates: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return NextResponse.json(category.templates);
}
