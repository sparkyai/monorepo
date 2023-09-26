import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export const config = {
  matcher: ["/categories", "/templates"],
};

export default async function middleware(request: NextRequest) {
  const jwt = request.headers.get("Authorization")?.slice(7);

  if (jwt) {
    try {
      await jwtVerify(jwt, JWT_KEY);
      return NextResponse.next();
    } catch {
      //
    }
  }

  return new NextResponse("Unauthorized", { status: 401 });
}
