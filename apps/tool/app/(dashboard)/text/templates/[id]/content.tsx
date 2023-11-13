"use client";

import type { UIEvent } from "react";
import { useRef, useState, useEffect } from "react";
import Loader from "@components/common/loader";
import { useGeneration } from "./generation";

export default function Content() {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const [lock, setLock] = useState(true);
  const [content, isLoading, error] = useGeneration();

  useEffect(() => {
    lock && ref.current && ref.current.scrollTo({ top: ref.current.scrollHeight });
  }, [lock, content]);

  return (
    <div
      className="flex grow flex-col gap-3 overflow-y-auto border-r border-slate-700 p-6"
      onScroll={onScroll}
      ref={ref}
    >
      {isLoading && !content && <Loader className="rounded-xl border border-slate-700 bg-slate-800 py-4" />}
      {content && (
        <p className="whitespace-break-spaces rounded-xl border border-slate-700 bg-slate-800 p-4">{content}</p>
      )}
      {error && (
        <p className="whitespace-break-spaces rounded-xl border border-slate-700 bg-slate-800 p-4 text-center text-rose-500">
          {error}
        </p>
      )}
    </div>
  );

  function onScroll(event: UIEvent<HTMLDivElement>) {
    const { scrollTop, scrollHeight, offsetHeight } = event.currentTarget;

    setLock(scrollTop - top > 0 && scrollTop + offsetHeight === scrollHeight);
    setTop(scrollTop);
  }
}
