import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type TableWrapProps = PropsWithChildren<{
  className?: string;
}>;

export default function TableWrap(props: TableWrapProps) {
  return (
    <div className={twMerge("rounded-md border border-slate-700 bg-slate-800 tracking-wider", props.className, "grid")}>
      {props.children}
    </div>
  );
}
