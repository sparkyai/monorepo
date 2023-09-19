import type { PropsWithChildren } from "react";

type GroupProps = PropsWithChildren<{
  name: string;
}>;

export default function Group(props: GroupProps) {
  return (
    <div className="lg:col-span-2">
      <h3 className="text-md font-semibold">{props.name}</h3>
      <div className="mt-4 flex flex-col">{props.children}</div>
    </div>
  );
}
