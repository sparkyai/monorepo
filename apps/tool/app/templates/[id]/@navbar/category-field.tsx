"use client";

import { useState } from "react";
import { useClickOutside } from "@mantine/hooks";
import TemplateNavbarTextFiled from "./text-field";

type TemplateNavbarAutocompleteProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  categories: {
    id: number;
    name: string;
  }[];
};

export default function TemplateNavbarCategoryField(props: TemplateNavbarAutocompleteProps) {
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
          {props.categories
            .filter((item) => !props.value || item.name.includes(props.value))
            .map((item) => (
              <button
                className="rounded-md bg-stone-600 px-3 py-1 text-left"
                key={item.id}
                onClick={() => {
                  props.onChange(item.name);
                  setShow(false);
                }}
                type="button"
              >
                {item.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
