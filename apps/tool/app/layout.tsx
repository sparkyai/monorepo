import "./common.css";
import type { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html className="text-red-50 bg-zinc-900" lang="en">
      <body>{children}</body>
    </html>
  );
}
