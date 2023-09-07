"use client";

import { useId } from "react";

type TemplateSidebarTextFiledProps = {
  name: string;
  value: string;
  onFocus?: () => void;
  onChange: (value: string) => void;
};

export default function TemplateSidebarTextFiled(props: TemplateSidebarTextFiledProps) {
  const id = `text${useId()}`;

  return (
    <label className="flex flex-col gap-1">
      <div className="flex justify-between gap-3 text-sm font-medium capitalize tracking-wider">
        <label htmlFor={id}>{props.name}</label>
      </div>
      <input
        className="rounded-md bg-stone-700 px-3 py-1.5"
        id={id}
        onChange={(e) => {
          props.onChange(e.currentTarget.value);
        }}
        onFocus={props.onFocus}
        type="text"
        value={props.value}
      />
    </label>
  );
}
