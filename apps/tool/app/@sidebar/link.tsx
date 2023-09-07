"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type LinkProps = PropsWithChildren<{
  href: string;
  prefetch?: boolean;
}>;

export default function Link(props: LinkProps) {
  const pathname = usePathname();

  return (
    <NextLink
      className={twMerge(
        "inline-flex items-center justify-center gap-2 rounded-md bg-stone-600 px-3 py-1.5 text-sm font-medium capitalize tracking-wide transition-colors hover:bg-blue-700 active:bg-blue-700",
        pathname.startsWith(props.href) && "bg-blue-800",
      )}
      href={props.href}
      prefetch={props.prefetch}
    >
      {props.children}
    </NextLink>
  );
}
