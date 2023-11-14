"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import TextField from "@components/form/text-field";

type SearchProps = {
  placeholder?: string;
};

export default function Search(props: SearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query")?.toString() || "");

  const updateSearchParams = useDebouncedCallback((newQuery: string) => {
    const params = new URLSearchParams(searchParams);

    if (newQuery) {
      params.set("query", newQuery);
    } else {
      params.delete("query");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return <TextField className="w-60" onChange={onChant} placeholder={props.placeholder} type="search" value={query} />;

  function onChant(value: string) {
    setQuery(value);
    updateSearchParams(value);
  }
}
