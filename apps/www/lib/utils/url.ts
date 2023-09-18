export function www(...slug: string[]) {
  return [process.env.WWW_URL, ...slug].filter(Boolean).join("/");
}

export function app(...slug: string[]) {
  return [process.env.APP_URL, ...slug].filter(Boolean).join("/");
}
