"use client";

import { twMerge } from "tailwind-merge";
import type { ChangeEvent } from "react";

type RangeFieldProps = {
  min?: number;
  max?: number;
  step?: number;
  name?: string;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
};

export default function RangeField(props: RangeFieldProps) {
  return (
    <div className={twMerge("relative flex", props.className)}>
      <input
        className="w-full rounded-md bg-transparent py-2 leading-5 tracking-wider"
        max={props.max}
        min={props.min}
        name={props.name}
        onChange={onChange}
        step={props.step}
        type="range"
        value={props.value}
      />
    </div>
  );

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    props.onChange?.(event.target.valueAsNumber);
  }
}
