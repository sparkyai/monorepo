"use client";

import { twMerge } from "tailwind-merge";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

type MegaMenuLinkProps = {
  name: string;
  href: string;
};

export default function MegaMenuLink(props: MegaMenuLinkProps) {
  const pathname = usePathname();

  return (
    <NextLink
      className={twMerge(
        "flex items-center gap-2 truncate rounded-md px-3 py-2 focus:outline-0",
        props.href === pathname ? "bg-gray-400" : "hover:bg-gray-400",
      )}
      href={props.href}
    >
      {props.name}
    </NextLink>
  );
}
