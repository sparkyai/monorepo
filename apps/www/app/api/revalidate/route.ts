import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const data = await request.json();

  if ("tags" in data) {
    for (const tag of data.tags) {
      revalidateTag(tag);
    }
  }

  return NextResponse.json({ done: true });
}
