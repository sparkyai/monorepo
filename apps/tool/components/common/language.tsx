"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { TypeOf } from "zod";
import SelectField from "@components/form/select-field";
import type { LanguageSchema } from "@lib/utils/schema";

type LanguageProps = {
  languages: TypeOf<typeof LanguageSchema>[];
};

export default function Language(props: LanguageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setLanguage = (locale: string) => {
    const params = new URLSearchParams(searchParams);

    if (locale) {
      params.set("locale", locale);
    } else {
      params.delete("locale");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <SelectField
      className="w-36"
      onChange={setLanguage}
      options={props.languages.map((item) => ({
        label: item.name,
        value: item.code,
      }))}
      placeholder="Language"
      value={searchParams.get("locale") || ""}
    />
  );
}
