import type { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./common.css";
import { www } from "lib/utils/url";
import GoogleTagManager from "components/common/google-tag-manager";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },

  metadataBase: new URL(www()),
  themeColor: "#1E1E1E",
  openGraph: {
    type: "article",
    siteName: "Sparky",
  },
};

type LocaleLayoutProps = PropsWithChildren<{
  params?: {
    locale: string;
  };
}>;

export default function LocaleLayout(props: LocaleLayoutProps) {
  return (
    <html className={inter.className} lang={props.params?.locale}>
      <GoogleTagManager id={process.env.GTM_ID} />
      <body className="flex min-h-screen flex-col">{props.children}</body>
    </html>
  );
}
