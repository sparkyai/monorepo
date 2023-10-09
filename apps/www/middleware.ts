import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getLocaleCollection } from "lib/data/locale";

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|payeer_1961742666.txt|sitemap.xml).*)"],
};

const IGNORE = /\.(?:png|jpe?g)$/;

export const LOCALE_COOKIE_NAME = "locale";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.slice(1);

  if (IGNORE.test(pathname)) {
    return NextResponse.next();
  }

  let defaultLocale: string | null = null;
  const locales = await getLocaleCollection();

  for (const { code, isDefault } of locales) {
    if (isDefault) {
      defaultLocale = code;
    }

    if (pathname === code || pathname.startsWith(`${code}/`)) {
      const response = NextResponse.next();

      setLocale(response, code);

      return response;
    }
  }

  if (!defaultLocale) {
    throw new Error("Invalid default locale");
  }

  let locale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;

  if (!locale) {
    const acceptLanguages = request.headers.get("Accept-Language")?.split(",") || [];
    const userLanguages = acceptLanguages.map((language) => language.split(";")[0]);

    for (const item of userLanguages) {
      if (locales.some(({ code }) => code === item)) {
        locale = item;
        break;
      }
    }

    if (!locale) {
      locale = defaultLocale;
    }
  }

  const params = request.nextUrl.searchParams.toString();
  const response = NextResponse.redirect(new URL(`/${locale}/${pathname}${params ? `?${params}` : ""}`, request.url));

  setLocale(response, locale);

  return response;
}

function setLocale(response: NextResponse, locale: string) {
  response.cookies.set(LOCALE_COOKIE_NAME, locale, {
    domain: `.${process.env.DOMAIN}`,
    path: "/",
  });
}
