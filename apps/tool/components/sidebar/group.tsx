import type { PropsWithChildren, ReactNode } from "react";

type SidebarGroupProps = PropsWithChildren<{
  name: string;
  actions?: ReactNode;
}>;

export default function SidebarGroup(props: SidebarGroupProps) {
  return (
    <>
      <div className="flex justify-between gap-3 border-b border-slate-700 pb-2">
        <span className="text-xl font-medium">{props.name}</span>
        {props.actions}
      </div>
      <div className="flex flex-col gap-3 py-2">{props.children}</div>
    </>
  );
}
