"use client";

import Script from "next/script";

declare global {
  interface Window {
    dataLayer?: object[];
  }
}

type GoogleTagManagerProps = {
  id: string;
};

export default function GoogleTagManager(props: GoogleTagManagerProps) {
  if (typeof window !== "undefined" && !window.dataLayer) {
    window.dataLayer = [{ "gtm.start": Date.now(), event: "gtm.js" }];
  }

  return <Script async src={`https://www.googletagmanager.com/gtm.js?id=${props.id}`} />;
}
