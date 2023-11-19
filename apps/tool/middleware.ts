export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/api/chat/:path*",
    "/api/templates/:id/completion",
    "/api/analytics/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
};
