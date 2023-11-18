"use client";

import { twMerge } from "tailwind-merge";
import type { ChangeEvent } from "react";
import { useRef, useEffect } from "react";
import Close from "@components/icon/close";

type FileFieldProps = {
  name?: string;
  value?: null | File;
  width?: number;
  accept?: string;
  height?: number;
  multiple?: boolean;
  onChange?: (value: null | File) => void;
  className?: string;
};

export default function FileField(props: FileFieldProps) {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.current && !props.value) {
      input.current.value = "";
    }
  }, [props.value]);

  return (
    <div className={twMerge("relative flex rounded-md bg-slate-700", props.className)}>
      <input
        accept={props.accept}
        className={twMerge(
          "w-full cursor-pointer rounded-md bg-transparent px-4 py-2 leading-5 tracking-wider file:mr-2 file:border-0 file:border-r file:border-slate-50 file:bg-transparent file:p-0 file:pr-2 file:text-inherit",
          props.value && "pr-12",
        )}
        multiple={props.multiple}
        name="avatar"
        onChange={onChange}
        ref={input}
        type="file"
      />

      {props.value && (
        <button className="absolute right-0 top-0 rounded-r-md p-2.5" onClick={onClear} tabIndex={-1} type="button">
          <Close size={16} />
        </button>
      )}
    </div>
  );

  function onClear() {
    props.onChange?.(null);

    if (input.current) {
      input.current.value = "";
    }
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      props.onChange?.(event.target.files[0]);
    }
  }
}
