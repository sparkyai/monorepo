"use client";

import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { twMerge } from "tailwind-merge";
import Progress from "components/pricing/board/progress";

const Context = createContext([] as unknown as [string, Dispatch<SetStateAction<string>>]);

export function useQuality() {
  const [quality] = useContext(Context);

  return quality;
}

type QualityProviderProps = PropsWithChildren<{
  defaultQuality: string;
}>;

export function QualityProvider(props: QualityProviderProps) {
  const [quality, setQuality] = useState(props.defaultQuality);

  return (
    <Context.Provider value={[quality, setQuality]}>
      <Tooltip.Provider>{props.children}</Tooltip.Provider>
    </Context.Provider>
  );
}

type QualityTriggerProps = PropsWithChildren<{
  value: string;
  tooltip: {
    title: string;
    advantages: {
      label: string;
      value: number;
    }[];
    description: string;
  };
}>;

export function QualityTrigger(props: QualityTriggerProps) {
  const [quality, setQuality] = useContext(Context);
  const isActive = props.value === quality;

  function onClick() {
    setQuality(props.value);
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          className={twMerge(
            "text-md flex-1 rounded-full border px-5 py-2 font-semibold text-blue-50 transition-colors",
            isActive
              ? "cursor-default border-blue-500 bg-blue-500"
              : "border-gray-300 bg-gray-400 hover:border-gray-200 hover:bg-gray-300 active:border-gray-200 active:bg-gray-300",
          )}
          onClick={onClick}
          type="button"
        >
          {props.children}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="flex max-w-xs flex-col rounded-md border border-gray-400 bg-gray-600 p-4"
          sideOffset={8}
        >
          <p className="mb-2 text-sm font-semibold tracking-wide">{props.tooltip.title}</p>
          <p className="text-xs tracking-wider text-gray-200">{props.tooltip.description}</p>
          <div className="mt-4 flex flex-col gap-1 text-xs leading-5 text-gray-200">
            {props.tooltip.advantages.map((advantage) => (
              <div className="flex justify-between gap-2" key={advantage.label}>
                <span className="truncate capitalize">{advantage.label}</span>
                <Progress className="text-blue-300" size={16} value={advantage.value} />
              </div>
            ))}
          </div>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
