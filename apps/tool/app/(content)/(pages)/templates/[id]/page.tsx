"use client";

import type { UIEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { usePreview } from "./preview";

export default function Template() {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const [lock, setLock] = useState(true);
  const { content } = usePreview();

  useEffect(() => {
    lock && ref.current && ref.current.scrollTo({ top: ref.current.scrollHeight });
  }, [lock, content]);

  return (
    <div
      className="flex grow flex-col gap-3 overflow-y-auto border-r border-slate-700 p-6"
      onScroll={onScroll}
      ref={ref}
    >
      {content && (
        <p className="whitespace-break-spaces rounded-xl border border-slate-700 bg-slate-800 p-4">{content}</p>
      )}
    </div>
  );

  function onScroll(event: UIEvent<HTMLDivElement>) {
    const { scrollTop, scrollHeight, offsetHeight } = event.currentTarget;

    setLock(scrollTop - top > 0 && scrollTop + offsetHeight === scrollHeight);
    setTop(scrollTop);
  }
}
