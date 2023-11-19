import "./common.css";
import { Roboto } from "next/font/google";
import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout(props: PropsWithChildren) {
  return (
    <html className={roboto.className} lang="en">
      <body className="flex bg-slate-900 text-slate-50">{props.children}</body>
    </html>
  );
}
