import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type WidgetProps = PropsWithChildren<{
  className?: string;
}>;

export default function Widget(props: WidgetProps) {
  return (
    <div className={twMerge("flex flex-col rounded-md border border-slate-700 bg-slate-800 p-2", props.className)}>
      {props.children}
    </div>
  );
}
