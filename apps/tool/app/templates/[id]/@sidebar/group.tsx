import type { PropsWithChildren, ReactNode } from "react";

type TemplateSidebarGroupProps = PropsWithChildren<{
  name: string;
  actions?: ReactNode;
}>;

export default function TemplateSidebarGroup(props: TemplateSidebarGroupProps) {
  return (
    <>
      <div className="flex justify-between gap-3 border-b pb-2">
        <span className="text-xl font-medium">{props.name}</span>
        {props.actions}
      </div>
      <div className="flex flex-col gap-3 py-2">{props.children}</div>
    </>
  );
}
