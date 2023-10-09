import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"button"> & {
  size?: "md" | "lg";
};

export default function ButtonDanger(props: ButtonProps) {
  const { size, ...attrs } = props;

  return (
    <button
      type="button"
      {...attrs}
      className={twMerge(
        "rounded-md bg-rose-800 px-4 py-1.5 font-medium tracking-wider transition-colors hover:bg-rose-700 active:bg-rose-700",
        "disabled:cursor-not-allowed disabled:bg-rose-500 disabled:text-rose-400",
        size === "lg" && "rounded-lg px-6 py-2.5 text-lg tracking-wide",
        attrs.className,
      )}
    />
  );
}
