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
      <Script id={id}>{`window.dataLayer=[{"gtm.start":Date.now(),event:"gtm.js"}];`}</Script>
      <Script async src={`https://www.googletagmanager.com/gtm.js?id=${props.id}`} />
    </>
  );
}
