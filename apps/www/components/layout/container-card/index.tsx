import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type ContainerCardProps = PropsWithChildren<{
  className?: string;
}>;

export default function ContainerCard(props: ContainerCardProps) {
  return (
    <div className="container">
      <div
        className={twMerge(
          "flex flex-wrap overflow-hidden rounded-md bg-gray-600 p-5 shadow-md sm:p-12",
          props.className,
        )}
      >
        {props.children}
      </div>
    </div>
  );
}
