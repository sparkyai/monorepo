import { Roboto } from "next/font/google";
import type { PropsWithChildren, ReactElement } from "react";
import "./common.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["cyrillic"],
});

type RootLayoutProps = PropsWithChildren<{
  sidebar: ReactElement;
}>;

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html className={roboto.className} lang="en">
      <body className="flex h-screen overflow-hidden bg-stone-950 text-stone-50">
        {props.sidebar}
        {props.children}
      </body>
    </html>
  );
}
