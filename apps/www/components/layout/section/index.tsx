import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type SectionProps = PropsWithChildren<{
  className?: string;
}>;

export default function Section(props: SectionProps) {
  return (
    <section className={twMerge("flex flex-col gap-16 py-12 md:py-24", props.className)}>{props.children}</section>
  );
}
