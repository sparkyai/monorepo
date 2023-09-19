"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

type MenuLinkProps = {
  name: string;
  href: string;
  locale: string;
};

export default function MenuLink(props: MenuLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === props.href || (props.href !== `/${props.locale}` && pathname.startsWith(`${props.href}/`));

  return (
    <NextLink
      className={twMerge(
        "py-2 text-sm transition-colors hover:text-blue-500",
        isActive ? "text-blue-300" : "text-gray-50",
      )}
      href={props.href}
    >
      {props.name}
    </NextLink>
  );
}
