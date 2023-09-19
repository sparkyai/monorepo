"use client";

import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";
import * as Switch from "@radix-ui/react-switch";

const Context = createContext([] as unknown as [string, Dispatch<SetStateAction<string>>]);

export function usePeriod() {
  const [period] = useContext(Context);

  return period;
}

type PeriodProviderProps = PropsWithChildren<{
  defaultPeriod: string;
}>;

export function PeriodProvider({ children, defaultPeriod }: PeriodProviderProps) {
  const [period, setPeriod] = useState(defaultPeriod);

  return <Context.Provider value={[period, setPeriod]}>{children}</Context.Provider>;
}

type PeriodSwitchProps = {
  value: {
    true: string;
    false: string;
  };
  label: {
    true: string;
    false: string;
  };
};

export function PeriodSwitch({ value, label }: PeriodSwitchProps) {
  const [period, setPeriod] = useContext(Context);

  function onCheckedChange(checked: boolean) {
    setPeriod(checked ? value.true : value.false);
  }

  return (
    <Switch.Root
      aria-label={period === value.true ? label.true : label.false}
      checked={period === value.true}
      className="radix-state-checked:bg-blue-500 h-6 w-11 shrink-0 rounded-full bg-gray-400 p-0.5 transition-colors"
      onCheckedChange={onCheckedChange}
    >
      <Switch.Thumb className="radix-state-checked:ml-5 block h-5 w-5 rounded-full bg-gray-50 transition-[margin]" />
    </Switch.Root>
  );
}
