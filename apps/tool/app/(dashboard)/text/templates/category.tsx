"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SelectField from "@components/form/select-field";

type CategoryProps = {
  categories: {
    id: number;
    name: string;
  }[];
};

export default function Category(props: CategoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setCategory = (locale: string) => {
    const params = new URLSearchParams(searchParams);

    if (locale) {
      params.set("category", locale);
    } else {
      params.delete("category");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <SelectField
      className="w-44"
      onChange={setCategory}
      options={props.categories.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }))}
      placeholder="Category"
      value={searchParams.get("category") || ""}
    />
  );
}
