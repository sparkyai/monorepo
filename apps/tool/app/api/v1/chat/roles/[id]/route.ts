import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@lib/utils/prisma";

export const revalidate = 0;

type RoleProps = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, props: RoleProps) {
  const role = await prisma.chat_roles.findUniqueOrThrow({
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
      message: {
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

  return NextResponse.json(role);
}
