"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import ButtonBlueFilled from "components/button/button-blue-filled";
import Profit from "./profit";

type VariantsProps = {
  label: string;
  variants: {
    id: number;
    url: string;
    name: string;
    amount: number;
    profit: {
      label: string;
      content: {
        id: number;
        text: string;
      }[];
    };
  }[];
};

export default function Variants(props: VariantsProps) {
  const [variant, setVariant] = useState<number | null>(null);

  return (
    <div className="flex w-full flex-col gap-4 md:w-0 md:grow md:justify-between md:gap-8">
      <div className="flex flex-col gap-2">
        {props.variants.map((item) => (
          <div
            className={twMerge(
              "rounded-xs relative flex gap-4 border border-gray-500 bg-gray-500 px-5 py-3 transition-colors",
              variant === item.id
                ? "cursor-pointer border-blue-500"
                : "hover:border-gray-400 hover:bg-gray-400 active:border-gray-400 active:bg-gray-400",
            )}
            key={item.id}
          >
            <div className="flex w-full flex-col items-start gap-2">
              <h3 className="font-semibold leading-none">
                <button
                  className="after:absolute after:inset-0"
                  onClick={() => {
                    setVariant(item.id);
                  }}
                  type="button"
                >
                  {item.name}
                </button>
              </h3>
              <Profit {...item.profit} />
            </div>
            <span className="py-1.5 text-3xl font-semibold leading-none">${item.amount}</span>
          </div>
        ))}
      </div>
      <ButtonBlueFilled
        className={twMerge(
          "self-end",
          !variant &&
            "cursor-not-allowed border-gray-300 bg-gray-300 text-gray-200 hover:border-gray-300 hover:bg-gray-300 active:border-gray-300 active:bg-gray-300",
        )}
        component="a"
        disabled={variant === null}
        href={props.variants.find((item) => item.id === variant)?.url}
        rel="noreferrer"
        target="_blank"
      >
        {props.label}
      </ButtonBlueFilled>
    </div>
  );
}
