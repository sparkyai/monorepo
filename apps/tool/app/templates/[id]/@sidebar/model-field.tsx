"use client";

import { useState } from "react";
import { useClickOutside } from "@mantine/hooks";
import TemplateNavbarTextFiled from "./text-field";

type TemplateNavbarModelFieldProps = {
  name: string;
  value: string;
  models: string[];
  onChange: (value: string) => void;
};

export default function TemplateNavbarModelField(props: TemplateNavbarModelFieldProps) {
  const [show, setShow] = useState(false);
  const ref = useClickOutside(() => {
    setShow(false);
  });

  return (
    <div className="relative" ref={ref}>
      <TemplateNavbarTextFiled
        {...props}
        onFocus={() => {
          setShow(true);
        }}
      />
      {show && (
        <div className="absolute inset-x-0 top-full z-10 mt-2 flex max-h-32 flex-col gap-1 overflow-y-auto rounded-lg bg-stone-700 p-1">
          {props.models
            .filter((model) => !props.value || model.includes(props.value))
            .map((model) => (
              <button
                className="rounded-md bg-stone-600 px-3 py-1 text-left"
                key={model}
                onClick={() => {
                  props.onChange(model);
                  setShow(false);
                }}
                type="button"
              >
                {model}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
