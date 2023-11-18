import type { PropsWithChildren } from "react";
import Sparky from "@components/brand/sparky";

export default function SidebarLayout(props: PropsWithChildren) {
  return (
    <aside className="flex w-60 shrink-0 flex-col bg-slate-950">
      <div className="px-4">
        <div className="flex items-center justify-center gap-3 py-4">
          <Sparky size={40} />
          <span className="text-3xl font-bold tracking-wide">Sparky</span>
        </div>
        <hr className="border-slate-700" />
      </div>
      <div className="flex grow flex-col gap-4 overflow-y-auto py-4">{props.children}</div>
    </aside>
  );
}
