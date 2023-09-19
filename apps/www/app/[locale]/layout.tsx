import type { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./common.css";
import { www } from "lib/utils/url";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },

  metadataBase: new URL(www()),
  themeColor: "#1E1E1E",
  openGraph: {
    type: "website",
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
      <body className="flex min-h-screen flex-col bg-gray-900 text-blue-50">{props.children}</body>
    </html>
  );
}
