import NextLink from "next/link";
import { getLanguages, getRole } from "@lib/utils/data";
import ArrowLeft from "@components/icon/arrow-left";
import RoleEditor from "./edit";

type RoleHeaderProps = {
  params: {
    id: string;
  };
};

export default async function RoleHeader(props: RoleHeaderProps) {
  const [role, languages] = await Promise.all([getRole(parseInt(props.params.id)), getLanguages()]);

  return (
    <>
      <NextLink
        className="block shrink-0 rounded-full p-1.5 transition-colors hover:bg-slate-600 active:bg-slate-600"
        href="/roles"
      >
        <ArrowLeft size={24} />
      </NextLink>
      <h1 className="text-3xl font-medium tracking-wide">{role.name}</h1>
      <RoleEditor languages={languages} role={role} />
    </>
  );
}
