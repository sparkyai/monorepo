"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Close from "@components/icon/close";

type ChatLinkProps = {
  id: string;
  name: string;
  messages: number;
};

export default function ChatLink(props: ChatLinkProps) {
  const pathname = usePathname();

  return (
    <div
      className={twMerge(
        "group relative flex w-72 cursor-pointer flex-col gap-2 rounded-lg border-4 border-stone-600 bg-stone-600 px-2 py-1 transition-colors",
        pathname === `/chats/${props.id}`
          ? "border-blue-800 bg-blue-800"
          : "hover:border-blue-700 hover:bg-blue-700 active:border-blue-700 active:bg-blue-700",
      )}
    >
      <div className="flex gap-2">
        <NextLink
          className="grow truncate text-lg font-medium before:absolute before:inset-0"
          href={`/chats/${props.id}`}
        >
          {props.name}
        </NextLink>
        <div className="flex opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100">
          <NextLink
            className="z-10 rounded-full border-2 p-1.5 transition-colors hover:border-stone-700 hover:bg-stone-700 active:border-stone-700 active:bg-stone-700"
            href="#"
            prefetch={false}
          >
            <Close size={12} />
          </NextLink>
        </div>
      </div>
      <p className="overflow-hidden text-xs capitalize tracking-widest">messages: {props.messages}</p>
    </div>
  );
}
