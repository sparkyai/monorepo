"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import IcomoonIcon from "components/common/icomoon-icon";
import Collapsible from "components/common/collapsible";

type ProfitProps = {
  label: string;
  content: {
    id: number;
    text: string;
  }[];
};

export default function Profit(props: ProfitProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <h4 className="text-md z-10 inline-flex self-start leading-none text-blue-300">
        <button
          className="flex items-start gap-3 text-left focus:outline-0"
          onClick={() => {
            setIsOpen((state) => !state);
          }}
          type="button"
        >
          {props.label}
          <IcomoonIcon
            className={twMerge(
              "flex border border-transparent text-sm leading-none transition-transform duration-500",
              isOpen && "-rotate-90",
            )}
            name="chevron-down"
          />
        </button>
      </h4>
      <Collapsible className="list-disc pl-3.5 text-gray-100 first:[&>li]:mt-2" component="ul" open={isOpen}>
        {props.content.map((item) => (
          <li className="text-sm" key={item.id}>
            {item.text}
          </li>
        ))}
      </Collapsible>
    </div>
  );
}
