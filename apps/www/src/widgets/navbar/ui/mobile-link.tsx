"use client";

import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { twMerge } from "tailwind-merge";

type MobileLinkProps = {
  href: string;
  name: string;
  locale: string;
  external?: boolean;
};

export default function MobileLink(props: MobileLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === props.href || (props.href !== `/${props.locale}` && pathname.startsWith(`${props.href}/`));

  if (props.external) {
    return (
      <a
        className="flex h-12 w-full items-center gap-2.5 truncate border-b-2 border-transparent px-3 transition-colors hover:border-blue-400 active:border-blue-400"
        href={props.href}
        rel="noreferrer"
        target="_blank"
      >
        {props.name}
      </a>
    );
  }

  return (
    <NextLink
      className={twMerge(
        "flex h-12 w-full items-center gap-2.5 truncate border-b-2 border-transparent px-3 transition-colors",
        isActive ? "border-blue-400" : "border-transparent  hover:border-blue-400 active:border-blue-400",
      )}
      href={props.href}
    >
      {props.name}
    </NextLink>
  );
}
