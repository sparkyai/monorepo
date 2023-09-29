import type { JSX, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type SectionProps = PropsWithChildren<{
  className?: string;
  component?: keyof JSX.IntrinsicElements;
}>;

export default function Section(props: SectionProps) {
  const Component = props.component || "section";

  return (
    <Component className={twMerge("flex flex-col gap-16 py-12 md:py-24", props.className)}>{props.children}</Component>
  );
}
