import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@lib/utils/prisma";

type Handler<T> = (request: NextRequest, props?: T) => Promise<Response> | Response;

export function withTokenVerify<T>(handler: Handler<T>) {
  return async function callback(request: NextRequest, props?: T) {
    const key = request.headers.get("Authorization")?.slice(7);

    if (key) {
      const token = await prisma.tokens.findUnique({
        where: { key },
      });

      if (token) {
        return handler(request, props);
      }
    }

    return new NextResponse(null, { status: 401 });
  };
}
