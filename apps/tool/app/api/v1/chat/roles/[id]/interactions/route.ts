import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@lib/utils/prisma";
import { interaction } from "@lib/utils/schema";
import { handler } from "@app/api/v1/interaction";

export const revalidate = 0;

type RoleProps = {
  params: {
    id: string;
  };
};

export async function POST(request: NextRequest, props: RoleProps) {
  const data = interaction.parse(await request.json());

  await handler(data, parseInt(props.params.id), prisma.chat_roles);
  // prisma.chat_roles.update()

  return new NextResponse();
}
