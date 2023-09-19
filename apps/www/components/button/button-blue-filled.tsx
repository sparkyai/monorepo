import type { ComponentProps, JSX, JSXElementConstructor } from "react";
import { twMerge } from "tailwind-merge";

type ButtonBlueFilledProps = ComponentProps<keyof JSX.IntrinsicElements> & {
  component?: keyof JSX.IntrinsicElements | JSXElementConstructor<unknown>;
};

export default function ButtonBlueFilled(props: ButtonBlueFilledProps) {
  const { component: Component = "button", className, ...params } = props;

  return (
    <Component
      {...(params as object)}
      className={twMerge(
        "inline-flex cursor-pointer justify-center rounded-sm border border-blue-500 bg-blue-500 px-5 py-3.5 text-lg font-semibold leading-5 transition-colors hover:border-blue-400 hover:bg-blue-400 active:border-blue-400 active:bg-blue-400",
        className,
      )}
    />
  );
}
