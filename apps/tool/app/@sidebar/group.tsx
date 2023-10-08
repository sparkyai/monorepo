import type { PropsWithChildren } from "react";

type SidebarGroupProps = PropsWithChildren<{
  label?: string;
}>;

export default function SidebarGroup(props: SidebarGroupProps) {
  return (
    <div className="flex flex-col gap-1">
      {props.label && (
        <div className="cursor-default px-6">
          <span className="border-b border-slate-600 font-medium tracking-wider text-slate-400">{props.label}</span>
        </div>
      )}
      <div className="flex flex-col px-2">{props.children}</div>
    </div>
  );
}
