import { NextResponse } from "next/server";
import prisma from "@lib/utils/prisma";

export const revalidate = 0;

export async function GET() {
  return NextResponse.json(
    await prisma.categories.findMany({
      include: {
        templates: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
  );
}
