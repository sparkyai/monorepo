import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import AboutCard from "./card";

type AboutContainerCardProps = PropsWithChildren<{
  light?: boolean;
  className?: string;
}>;

export default function AboutContainerCard(props: AboutContainerCardProps) {
  return (
    <div className="container">
      <AboutCard
        className={twMerge("flex-row flex-wrap p-6 sm:p-8 md:p-12 lg:p-16", props.className)}
        light={props.light}
      >
        {props.children}
      </AboutCard>
    </div>
  );
}
