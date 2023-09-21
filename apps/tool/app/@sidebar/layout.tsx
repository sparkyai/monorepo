import type { PropsWithChildren, ReactElement } from "react";
import Link from "./link";

type SidebarLayoutProps = PropsWithChildren<{
  search: ReactElement;
}>;

export default function SidebarLayout(props: SidebarLayoutProps) {
  return (
    <aside className="flex w-80 flex-col gap-4 overflow-x-hidden bg-stone-900 py-4">
      <div className="grid grid-cols-2 gap-4 px-4">
        <h1 className="col-span-2 mb-4 text-4xl font-bold">Sparky</h1>

        <Link href="/chats">chats</Link>
        <Link href="/templates">templates</Link>

        {props.search}
      </div>

      {props.children}
    </aside>
  );
}
