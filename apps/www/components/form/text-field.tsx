"use client";

import type { ChangeEvent, Dispatch } from "react";
import { useId } from "react";
import { twMerge } from "tailwind-merge";

type TextFieldProps = {
  name: string;
  type?: "text" | "email" | "password";
  rows?: number;
  label: string;
  value?: string;
  hasError?: boolean;
  required?: boolean;
  onChange?: Dispatch<string>;
  placeholder?: string;
};

export default function TextField(props: TextFieldProps) {
  const id = `text-field${useId()}${props.name}`;
  const isMultiline = typeof props.rows === "number";

  const Component = isMultiline && (!props.type || props.type === "text") ? "textarea" : "input";

  return (
    <div className="group flex flex-col">
      <label
        className={twMerge("mb-2 self-start px-2 text-sm font-bold tracking-wide", props.hasError && "text-red-500")}
        htmlFor={id}
      >
        {props.label}
        {props.required && "*"}
      </label>
      <Component
        className={twMerge(
          "flex resize-none gap-4 rounded-sm border border-gray-400 bg-gray-500 px-4 py-2 text-blue-50 ring-blue-400 ring-offset-1 ring-offset-transparent transition-shadow placeholder:text-gray-300 hover:ring-2 focus:outline-0 focus:ring-2 active:ring-2",
          props.hasError && "border-red-500",
        )}
        id={id}
        name={props.name}
        onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          props.onChange?.(event.target.value);
        }}
        placeholder={props.placeholder}
        required={props.required}
        rows={props.rows}
        type={props.type}
        value={props.value}
      />
      {/*{props.error && <p className="mt-1 px-2 text-xs font-bold tracking-wider text-red-500">{props.error}</p>}*/}
    </div>
  );
}
