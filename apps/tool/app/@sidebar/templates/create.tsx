"use client";

import { useRouter } from "next/navigation";
import { createTemplate } from "@lib/actions/template";

export default function CreateTemplate() {
  const router = useRouter();

  return (
    <div className="flex justify-end px-4">
      <button
        className="inline-flex items-center justify-center gap-2 rounded-md bg-stone-600 px-3 py-1.5 text-sm font-medium capitalize tracking-wide transition-colors hover:bg-blue-700 active:bg-blue-700"
        onClick={() =>
          void createTemplate().then((template) => {
            router.push(`/templates/${template.id}`);
          })
        }
        type="button"
      >
        new template
      </button>
    </div>
  );
}
