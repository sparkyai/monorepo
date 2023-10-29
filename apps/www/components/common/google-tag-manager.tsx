"use client";

import Script from "next/script";
import { useSearchParams } from "next/navigation";

type GoogleTagManagerProps = {
  id?: string;
};

export default function GoogleTagManager(props: GoogleTagManagerProps) {
  const searchParams = useSearchParams();

  if (searchParams.has("gtm_debug") || (process.env.NODE_ENV === "production" && props.id)) {
    return <Script async src={`https://www.googletagmanager.com/gtm.js?id=${props.id}`} />;
  }

  return null;
}
