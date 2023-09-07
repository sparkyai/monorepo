"use client";

import { usePreview } from "./preview";

export default function Template() {
  const { content } = usePreview();

  return (
    <div className="flex flex-col gap-3 overflow-y-auto p-4">
      {content && <p className="rounded-xl border border-blue-500 bg-stone-800 p-4">{content}</p>}
    </div>
  );
}
