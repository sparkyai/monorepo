"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SelectField from "@components/form/select-field";

type ProviderProps = {
  providers: string[];
};

export default function Provider(props: ProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setProvider = (provider: string) => {
    const params = new URLSearchParams(searchParams);

    if (provider) {
      params.set("provider", provider);
    } else {
      params.delete("provider");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <SelectField
      className="w-44"
      onChange={setProvider}
      options={props.providers}
      placeholder="Provider"
      value={searchParams.get("provider") || ""}
    />
  );
}
