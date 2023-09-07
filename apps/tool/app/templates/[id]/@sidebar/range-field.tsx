"use client";

import { useId } from "react";

type TemplateSidebarRangeFiledProps = {
  min?: number;
  max?: number;
  name: string;
  step?: number;
  value: number;
  onFocus?: () => void;
  onChange: (value: number) => void;
};

export default function TemplateSidebarRangeFiled(props: TemplateSidebarRangeFiledProps) {
  const id = `range${useId()}`;

  return (
    <label className="flex flex-col gap-1">
      <div className="flex justify-between gap-3 text-sm font-medium tracking-wider">
        <label htmlFor={id}>{props.name}</label>
        {typeof props.value === "number" && <span>{props.value}</span>}
      </div>
      <input
        className="rounded-md bg-stone-700"
        id={id}
        max={props.max}
        min={props.min}
        onChange={(e) => {
          props.onChange(e.currentTarget.valueAsNumber);
        }}
        onFocus={props.onFocus}
        step={props.step || 0.01}
        type="range"
        value={props.value}
      />
    </label>
  );
}
