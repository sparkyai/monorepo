"use client";

import { twMerge } from "tailwind-merge";
import type { ChangeEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import Close from "@components/icon/close";

type Option =
  | string
  | {
      label: string;
      value: string;
    };

type TextFieldProps = {
  name?: string;
  value?: string;
  options: Option[];
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
};

export default function SelectField(props: TextFieldProps) {
  const input = `select-field${useId()}${props.name}`;

  const ref = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(getOptionQuery(props.value));
  const [show, setShow] = useState(false);

  const options = props.options.filter(
    (item) => query === getOptionQuery(props.value) || getOptionLabel(item).toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    function onMouseDown(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setShow(false);
      }
    }

    if (show) {
      window.addEventListener("mousedown", onMouseDown, true);

      return function cancel() {
        window.removeEventListener("mousedown", onMouseDown, true);
      };
    }
  }, [show]);

  return (
    <div className={twMerge("relative flex rounded-md bg-slate-700", props.className)} ref={ref}>
      <input
        className={twMerge(
          "w-full rounded-md bg-transparent px-4 py-2 leading-5 tracking-wider",
          props.value && "pr-12",
        )}
        defaultValue={props.defaultValue}
        id={input}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={props.placeholder}
        type="text"
        value={query}
      />
      {query && (
        <button className="absolute right-0 rounded-r-md p-2.5" onClick={onClear} tabIndex={-1} type="button">
          <Close size={16} />
        </button>
      )}
      {show && Boolean(options.length) && (
        <div className="absolute inset-x-0 top-full z-10 mt-2 flex max-h-36 flex-col overflow-y-auto rounded-md border border-slate-600 bg-slate-700 p-1">
          {options.map((item) => (
            <button
              className="rounded px-3 py-1 text-left transition-colors hover:bg-slate-600 active:bg-slate-600"
              key={getOptionValue(item)}
              onClick={selectHandler(item)}
              type="button"
            >
              {getOptionLabel(item)}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  function onFocus() {
    setShow(true);
  }

  function onClear() {
    setShow(false);
    setQuery("");
    props.onInput?.("");
    props.onChange?.("");
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    props.onInput?.(event.target.value);
  }

  function selectHandler(option: Option) {
    return function onSelect() {
      setShow(false);

      setQuery(getOptionLabel(option));
      props.onInput?.(getOptionLabel(option));
      props.onChange?.(getOptionValue(option));
    };
  }

  function getOptionQuery(value?: string) {
    const option = props.options.find((item) => getOptionValue(item) === value);

    return option ? getOptionLabel(option) : "";
  }
}

function getOptionLabel(option: Option) {
  return typeof option === "object" ? option.label : option;
}

function getOptionValue(option: Option) {
  return typeof option === "object" ? option.value : option;
}
