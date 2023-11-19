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
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
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
          props.value && !props.readOnly && "pr-12",
        )}
        defaultValue={props.defaultValue}
        list={props.list && !isTextArea ? list : void 0}
        onChange={onChange}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        rows={props.rows}
        type={isTextArea ? void 0 : props.type || "text"}
        value={props.value}
      />
      {props.value && !props.readOnly && !isTextArea && (
        <button className="absolute right-0 rounded-r-md p-2.5" onClick={onClick} tabIndex={-1} type="button">
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
