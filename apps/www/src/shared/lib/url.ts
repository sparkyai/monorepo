import { env } from "@sparky/env";

export function www(...slug: string[]) {
  return [env("WWW_URL"), ...slug].filter(Boolean).join("/");
}

export function app(...slug: string[]) {
  return [env("APP_URL"), ...slug].filter(Boolean).join("/");
}
