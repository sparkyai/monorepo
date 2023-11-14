"use client";

import type { SyntheticEvent } from "react";
import Remove from "@components/icon/remove";

type PosterProps = {
  file: null | (File & { width: number; height: number });
  poster: null | string;
  onDelete?: VoidFunction;
};

export default function Poster(props: PosterProps) {
  let url: string | undefined = void 0;

  if (props.file) {
    url = URL.createObjectURL(props.file);
  } else if (props.poster) {
    url = props.poster;
  }

  return (
    <div className="relative aspect-video rounded-md bg-slate-700 p-2">
      {url && (
        <div className="relative h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element -- - */}
          <img alt={url} className="absolute inset-0 h-full w-full object-contain" onLoad={onLoad} src={url} />
        </div>
      )}
      {props.poster && props.onDelete && (
        <button
          className="absolute right-0 top-0 rounded-r-md p-2.5 transition-colors hover:text-rose-500 active:text-rose-500"
          onClick={props.onDelete}
          type="button"
        >
          <Remove size={16} />
        </button>
      )}
    </div>
  );

  function onLoad(event: SyntheticEvent<HTMLImageElement>) {
    if (props.file) {
      props.file.width = event.currentTarget.naturalWidth;
      props.file.height = event.currentTarget.naturalHeight;
    }
  }
}
