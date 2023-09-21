"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SearchTemplateProps = {
  searchParams: {
    search?: string;
  };
};

export default function SearchTemplate(props: SearchTemplateProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const search = query.trim();

      if (props.searchParams.search !== search) {
        router.replace(`?search=${query}`);
      }
    }, 300);

    return function cancel() {
      clearTimeout(timer);
    };
  }, [router, props, query]);

  return (
    <label className="col-span-2 flex flex-col gap-2">
      <input
        className="rounded-md bg-stone-700 px-3 py-1.5"
        onChange={(e) => {
          setQuery(e.currentTarget.value);
        }}
        placeholder="Template"
        type="text"
        value={query}
      />
    </label>
  );
}
