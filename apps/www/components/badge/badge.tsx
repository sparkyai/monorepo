import type { ComponentProps, JSX } from "react";
import { twMerge } from "tailwind-merge";

type BadgeProps = ComponentProps<keyof JSX.IntrinsicElements> & {
  component?: keyof JSX.IntrinsicElements;
};

export default function Badge(props: BadgeProps) {
  const { component: Component = "span", className, ...params } = props;

  return <Component {...(params as object)} className={twMerge("rounded-full bg-gray-400 px-5 py-1", className)} />;
}
