"use client";

import type { PropsWithChildren } from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import IcomoonIcon from "components/common/icomoon-icon";
import Collapsible from "components/common/collapsible";

type QuestionProps = PropsWithChildren<{
  text: string;
}>;
export default function Question(props: QuestionProps) {
  const [isOpen, setIsOpen] = useState(false);

  function onClick() {
    setIsOpen((state) => !state);
  }

  return (
    <div className="flex flex-col rounded-sm border border-gray-400 bg-gray-600 px-7 py-5">
      <h3 className="text-lg font-medium">
        <button className="flex w-full items-start gap-3 text-left" onClick={onClick} type="button">
          {props.text}
          <IcomoonIcon
            className={twMerge(
              "ml-auto block border border-transparent p-1 text-[1.125rem] text-blue-500 transition-transform duration-500",
              isOpen && "-rotate-90",
            )}
            name="chevron-down"
          />
        </button>
      </h3>
      <Collapsible open={isOpen}>{props.children}</Collapsible>
    </div>
  );
}
