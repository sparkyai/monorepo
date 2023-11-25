"use client";

import Script from "next/script";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: object[];
  }
}

type GoogleTagManagerProps = {
  id?: string;
};

export default function GoogleTagManager(props: GoogleTagManagerProps) {
  const searchParams = useSearchParams();

  if (searchParams.has("gtm_debug") && props.id) {
    if (typeof window !== "undefined" && !window.dataLayer) {
      window.dataLayer = [{ "gtm.start": Date.now(), event: "gtm.js" }];
    }

    return <Script async src={`https://www.googletagmanager.com/gtm.js?id=${props.id}`} />;
  }

  return null;
}
