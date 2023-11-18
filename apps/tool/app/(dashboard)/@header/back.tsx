"use client";

import { useRouter } from "next/navigation";
import ArrowLeft from "@components/icon/arrow-left";

export default function Back() {
  const router = useRouter();

  return (
    <button
      className="block shrink-0 rounded-full p-1.5 transition-colors hover:bg-slate-600 active:bg-slate-600"
      onClick={onClick}
      type="button"
    >
      <ArrowLeft size={24} />
    </button>
  );

  function onClick() {
    router.back();
  }
}
