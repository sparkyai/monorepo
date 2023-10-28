"use client";

import Script from "next/script";

type GoogleTagManagerProps = {
  id?: string;
};

export default function GoogleTagManager(props: GoogleTagManagerProps) {
  if (process.env.NODE_ENV !== "production" || !props.id) {
    return null;
  }

  return <Script async src={`https://www.googletagmanager.com/gtm.js?id=${props.id}`} />;
}
