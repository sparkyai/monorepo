"use client";

import type { PropsWithChildren } from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Collapsible from "components/common/collapsible";
import IcomoonIcon from "components/common/icomoon-icon";

type CollapsibleMenuProps = PropsWithChildren<{
  name: string;
}>;

export default function CollapsibleMenu(props: CollapsibleMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="flex h-12 w-full items-center gap-2.5 truncate border-b-2 border-transparent px-3 transition-colors hover:border-blue-400 active:border-blue-400"
        onClick={() => {
          setIsOpen((state) => !state);
        }}
        type="button"
      >
        {props.name}
        <IcomoonIcon
          className={twMerge("ml-auto block p-1 transition-transform duration-500", isOpen && "-rotate-90")}
          name="chevron-down"
        />
      </button>
      <Collapsible open={isOpen}>{props.children}</Collapsible>
    </>
  );
}
