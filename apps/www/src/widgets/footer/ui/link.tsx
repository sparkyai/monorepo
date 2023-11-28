"use client";

import NextLink from "next/link";
import { twMerge } from "tailwind-merge";
import type { AriaAttributes, PropsWithChildren } from "react";
import { usePathname } from "next/navigation";

type MenuLinkProps = PropsWithChildren<
  AriaAttributes & {
    href: string;
  }
>;

export default function Link(props: MenuLinkProps) {
  const pathname = usePathname();

  return (
    <NextLink
      {...props}
      className={twMerge(
        "py-2 text-sm transition-colors hover:text-blue-500",
        pathname === props.href ? "text-blue-300" : "text-gray-50",
      )}
      href={props.href}
    />
  );
}
