import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type FieldGroupProps = PropsWithChildren<{
  label: string;
  value?: number;
  className?: string;
}>;

export default function FieldGroup(props: FieldGroupProps) {
  return (
    <div className={twMerge(props.className, "flex flex-col gap-1")}>
      <div className="flex justify-between gap-3 text-sm font-medium tracking-wider">
        <span>{props.label}</span>
        {typeof props.value === "number" && <span>{props.value}</span>}
      </div>
      {props.children}
    </div>
  );
}
