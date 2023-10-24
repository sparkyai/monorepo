"use client";

import { twMerge } from "tailwind-merge";
import NextImage from "next/image";
import type { ChangeEvent } from "react";
import Close from "@components/icon/close";

type ImageFieldProps = {
  name?: string;
  value?: null | File;
  width?: number;
  height?: number;
  onChange?: (value: null | File) => void;
  className?: string;
};

export default function ImageField(props: ImageFieldProps) {
  return (
    <div className={twMerge("relative flex rounded-md bg-slate-700 p-2", props.className)}>
      {props.value ? (
        <div className="relative h-full w-full">
          <NextImage
            alt="Poster"
            className="mx-auto object-contain"
            fill={
              typeof props.width !== "number" || props.width < 1 || typeof props.height !== "number" || props.height < 1
            }
            height={props.height}
            src={URL.createObjectURL(props.value)}
            width={props.width}
          />
        </div>
      ) : (
        <span className="m-auto">Choose file</span>
      )}

      <label className="cursor-pointer rounded-md after:absolute after:inset-0">
        <input
          accept="image/*"
          className="w-full rounded-md bg-transparent py-2 leading-5 tracking-wider"
          hidden
          name="avatar"
          onChange={onChange}
          type="file"
        />
      </label>

      {props.value && (
        <button className="absolute right-0 top-0 rounded-r-md p-2.5" onClick={onClear} type="button">
          <Close size={16} />
        </button>
      )}
    </div>
  );

  function onClear() {
    props.onChange?.(null);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      props.onChange?.(event.target.files[0]);
    }
  }
}
