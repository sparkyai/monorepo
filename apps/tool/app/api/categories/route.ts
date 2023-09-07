import { NextResponse } from "next/server";
import prisma from "@lib/utils/prisma";

export async function GET() {
  return NextResponse.json(await prisma.category.findMany());
}
