import type { ComponentProps, JSX } from "react";
import { twMerge } from "tailwind-merge";

type ButtonGrayFilledProps = ComponentProps<keyof JSX.IntrinsicElements> & {
  component?: keyof JSX.IntrinsicElements;
};

export default function ButtonGrayFilled(props: ButtonGrayFilledProps) {
  const { component: Component = "button", className, ...params } = props;

  return (
    <Component
      {...(params as object)}
      className={twMerge(
        "inline-flex cursor-pointer justify-center rounded-sm border border-gray-500 bg-gray-500 px-5 py-3.5 text-lg font-semibold leading-5 transition-colors hover:border-gray-400 hover:bg-gray-400 active:border-gray-400 active:bg-gray-400",
        className,
      )}
    />
  );
}
