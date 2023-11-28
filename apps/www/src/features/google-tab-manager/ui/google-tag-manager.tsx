"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: object[];
  }
}

type GoogleTagManagerProps = {
  id: string;
};

export default function GoogleTagManager(props: GoogleTagManagerProps) {
  useEffect(() => {
    window.dataLayer = [{ "gtm.start": Date.now(), event: "gtm.js" }];
  }, []);

  return <Script async src={`https://www.googletagmanager.com/gtm.js?id=${props.id}`} />;
}
