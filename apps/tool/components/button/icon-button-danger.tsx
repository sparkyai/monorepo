import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"button"> & {
  size?: "md" | "lg";
};

export default function IconButtonDanger(props: ButtonProps) {
  const { size, ...attrs } = props;

  return (
    <button
      type="button"
      {...attrs}
      className={twMerge(
        "rounded-md p-1.5 text-slate-50 transition-colors hover:text-rose-500 active:text-rose-500",
        "disabled:cursor-not-allowed disabled:text-slate-400",
        size === "lg" && "rounded-lg p-2.5",
        attrs.className,
      )}
    />
  );
}
