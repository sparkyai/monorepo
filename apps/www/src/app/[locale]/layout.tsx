import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { www } from "shared/lib/url";
import "./common.css";
import GoogleTagManager from "../../../components/common/google-tag-manager";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },

  themeColor: "#1E1E1E",
  metadataBase: new URL(www()),
};

type LocaleLayoutProps = PropsWithChildren<{
  params?: {
    locale: string;
  };
}>;

export default function LocaleLayout(props: LocaleLayoutProps) {
  return (
    <html className={inter.className} lang={props.params?.locale}>
      <GoogleTagManager />
      <body className="flex flex-col">{props.children}</body>
    </html>
  );
}
