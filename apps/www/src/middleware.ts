import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "@sparky/env";
import { LOCALIZATION_COOKIE_NAME } from "features/localization";
import { fetchAllLanguages } from "entities/language";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|monitoring).*)"],
};

const FILE_REGEXP = /\.\w+$/;

const LOCALE_URL_REGEXP = /^\/(?<locale>\w{2})(?:\/|$)/;

export async function middleware(request: NextRequest) {
  let defaultLocale = "en";
  let response = NextResponse.next();

  if (FILE_REGEXP.test(request.nextUrl.pathname)) {
    return response;
  }

  const languages = await fetchAllLanguages();
  const match = LOCALE_URL_REGEXP.exec(request.nextUrl.pathname);

  for (const language of languages) {
    if (language.isDefault) {
      defaultLocale = language.code;
    }

    if (match?.groups?.locale && match?.groups?.locale === language.code) {
      setLocale(response, language.code);

      return response;
    }
  }

  let locale = request.cookies.get(LOCALIZATION_COOKIE_NAME)?.value;

  if (!locale || languages.every((language) => language.code !== locale)) {
    const acceptLanguages = request.headers.get("Accept-Language")?.split(",") || [];
    const userLanguages = acceptLanguages.map((language) => language.split(";")[0]);

    for (const item of userLanguages) {
      if (languages.some((language) => language.code === item)) {
        locale = item;
        break;
      }
    }

    if (!locale) {
      locale = defaultLocale;
    }
  }

  const url = new URL(request.url);
  url.pathname = `/${locale}${url.pathname}`;

  response = NextResponse.redirect(new URL(locale, request.url), { status: 307 });

  setLocale(response, locale);

  return response;
}

function setLocale(response: NextResponse, locale: string) {
  response.cookies.set(LOCALIZATION_COOKIE_NAME, locale, {
    domain: `.${env("DOMAIN")}`,
    path: "/",
  });
}
