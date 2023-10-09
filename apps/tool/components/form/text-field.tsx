"use client";

import { twMerge } from "tailwind-merge";
import type { ChangeEvent } from "react";
import { useId } from "react";
import Close from "@components/icon/close";

type TextFieldProps = {
  rows?: number;
  name?: string;
  type?: "email" | "password" | "search" | "tel" | "text" | "url";
  list?: string[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
};

export default function TextField(props: TextFieldProps) {
  const list = `datalist-field${useId()}${props.name}`;
  const isTextArea = typeof props.rows === "number";
  const Component = isTextArea ? "textarea" : "input";

  return (
    <div className={twMerge("relative flex rounded-md bg-slate-700", props.className)}>
      <Component
        className={twMerge(
          "w-full rounded-md bg-transparent px-4 py-2 leading-5 tracking-wider",
          props.value && "pr-12",
        )}
        list={props.list && !isTextArea ? list : void 0}
        onChange={onChange}
        placeholder={props.placeholder}
        rows={props.rows}
        type={isTextArea ? void 0 : props.type || "text"}
        value={props.value}
      />
      {props.value && !isTextArea && (
        <button className="absolute right-0 rounded-r-md p-2.5" onClick={onClick} type="button">
          <Close size={16} />
        </button>
      )}
      {props.list && !isTextArea && (
        <datalist id={list}>
          {props.list.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
      )}
    </div>
  );

  function onClick() {
    props.onChange?.("");
  }

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    props.onChange?.(event.target.value);
  }
}