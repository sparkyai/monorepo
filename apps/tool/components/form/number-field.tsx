"use client";

import { twMerge } from "tailwind-merge";
import type { ChangeEvent } from "react";
import Close from "@components/icon/close";

type NumberFieldProps = {
  name?: string;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
  placeholder?: string;
  defaultValue?: number;
};

export default function NumberField(props: NumberFieldProps) {
  return (
    <div className={twMerge("relative flex rounded-md bg-slate-700", props.className)}>
      <input
        className={twMerge(
          "w-full rounded-md bg-transparent px-4 py-2 leading-5 tracking-wider",
          props.value && "pr-12",
        )}
        defaultValue={props.defaultValue}
        onChange={onChange}
        placeholder={props.placeholder}
        type="number"
        value={props.value}
      />
      {props.value !== 0 && (
        <button className="absolute right-0 rounded-r-md p-2.5" onClick={onClick} type="button">
          <Close size={16} />
        </button>
      )}
    </div>
  );

  function onClick() {
    props.onChange?.(0);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    props.onChange?.(event.target.valueAsNumber);
  }
}
