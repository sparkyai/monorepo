"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type LinkProps = PropsWithChildren<{
  href: string;
}>;

export default function SidebarLink(props: LinkProps) {
  const pathname = usePathname();
  const isActive = props.href === "/" ? pathname === props.href : pathname.startsWith(props.href);

  return (
    <NextLink
      className={twMerge(
        "rounded-md px-4 py-1.5 tracking-wide transition-colors hover:bg-slate-700 active:bg-slate-700",
        isActive && "bg-slate-800",
      )}
      href={props.href}
    >
      {props.children}
    </NextLink>
  );
}
