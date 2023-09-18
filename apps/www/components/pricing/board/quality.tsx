"use client";

import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";

const Context = createContext([] as unknown as [string, Dispatch<SetStateAction<string>>]);

export function useQuality() {
  const [quality] = useContext(Context);

  return quality;
}

type QualityProviderProps = PropsWithChildren<{
  defaultQuality: string;
}>;

export function QualityProvider({ children, defaultQuality }: QualityProviderProps) {
  const [quality, setQuality] = useState(defaultQuality);

  return <Context.Provider value={[quality, setQuality]}>{children}</Context.Provider>;
}

type QualityTriggerProps = PropsWithChildren<{
  value: string;
}>;

export function QualityTrigger({ value, children }: QualityTriggerProps) {
  const [quality, setQuality] = useContext(Context);
  const isActive = value === quality;

  function onClick() {
    setQuality(value);
  }

  return (
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
      {children}
    </button>
  );
}
