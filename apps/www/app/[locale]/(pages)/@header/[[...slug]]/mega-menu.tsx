"use client";

import type { PropsWithChildren } from "react";
import IcomoonIcon from "components/common/icomoon-icon";

type MegaMenuProps = PropsWithChildren<{
  name: string;
}>;

export default function MegaMenu(props: MegaMenuProps) {
  return (
    <div className="group relative">
      <button
        className="my-px inline-flex h-12 items-center gap-2.5 truncate border-b-2 border-transparent px-3"
        type="button"
      >
        {props.name}
        <IcomoonIcon className="text-xs transition-transform duration-300 group-hover:rotate-90" name="chevron-down" />
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full flex -translate-x-1/2 flex-col gap-2 rounded-md bg-gray-500 p-2 opacity-0 shadow transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-active:pointer-events-auto group-active:opacity-100">
        {props.children}
      </div>
    </div>
  );
}
