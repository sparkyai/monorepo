import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type AboutCardProps = PropsWithChildren<{
  light?: boolean;
  className?: string;
}>;

export default function AboutCard(props: AboutCardProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-5 rounded-md border border-gray-400 px-9 py-6",
        props.light ? "bg-blue-50 text-gray-600" : "bg-gray-600",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
