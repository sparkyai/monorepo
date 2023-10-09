import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"button"> & {
  size?: "md" | "lg";
};

export default function ButtonPrimary(props: ButtonProps) {
  const { size, ...attrs } = props;

  return (
    <button
      type="button"
      {...attrs}
      className={twMerge(
        "rounded-md bg-slate-700 px-4 py-1.5 font-medium tracking-wider transition-colors hover:bg-slate-600 active:bg-slate-600",
        "disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-slate-400",
        size === "lg" && "rounded-lg px-6 py-2.5 text-lg tracking-wide",
        attrs.className,
      )}
    />
  );
}
