import type { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

type TableRowProps = {
  values: (ReactElement | string)[];
  className?: string;
};

export default function TableRow(props: TableRowProps) {
  return (
    <>
      {props.values.map((item, i) => (
        <div
          className={twMerge(
            "border-t border-slate-700 text-sm leading-5",
            props.className,
            "flex gap-2 truncate px-4 py-3",
          )}
          key={typeof item === "string" ? `:${item}:${i}:` : item.key}
          title={typeof item === "string" ? item : void 0}
        >
          {typeof item === "string" ? <span className="truncate">{item}</span> : item}
        </div>
      ))}
    </>
  );
}
