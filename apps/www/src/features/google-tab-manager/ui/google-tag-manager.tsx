"use client";

import Script from "next/script";
import { useId } from "react";

type GoogleTagManagerProps = {
  id: string;
};

export default function GoogleTagManager(props: GoogleTagManagerProps) {
  const id = `gtm${useId()}${props.id}`;

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: 'window.dataLayer=[{"gtm.start":Date.now(),event:"gtm.js"}];' }}
        id={id}
        strategy="beforeInteractive"
      />
      <Script async src={`https://www.googletagmanager.com/gtm.js?id=${props.id}`} />
    </>
  );
}
