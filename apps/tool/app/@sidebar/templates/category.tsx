"use client";

import type { PropsWithChildren } from "react";
import CategorySettings from "./settings";
import CategoryDelete from "./delete";

type CategoryProps = PropsWithChildren<{
  id: number;
  name: string;
}>;

export default function Category(props: CategoryProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-72">
        <span className="mr-3 text-lg font-medium capitalize">{props.name}</span>
        <CategorySettings {...props} />
        <CategoryDelete {...props} />
      </div>
      {props.children}
    </div>
  );
}
