"use client";

import Script from "next/script";
import { env } from "@sparky/env";

declare global {
  interface Window {
    dataLayer?: object[];
  }
}

export default function GoogleTagManager() {
  if (typeof window !== "undefined" && !window.dataLayer) {
    window.dataLayer = [{ "gtm.start": Date.now(), event: "gtm.js" }];
  }

  try {
    return <Script async src={`https://www.googletagmanager.com/gtm.js?id=${env("NEXT_PUBLIC_GTM_ID")}`} />;
  } catch {
    return null;
  }
}
