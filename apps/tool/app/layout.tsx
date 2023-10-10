import { Roboto } from "next/font/google";
import type { PropsWithChildren, ReactElement } from "react";
import "./common.css";
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

type RootLayoutProps = PropsWithChildren<{
  header: ReactElement;
  sidebar: ReactElement;
}>;

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html className={roboto.className} lang="en">
      <body className="flex bg-slate-900 text-slate-50">
        {props.sidebar}
        {props.children}
      </body>
    </html>
  );
}
