import NextLink from "next/link";
import { getChatRole, getLanguageCollection, getChatCategoryCollection } from "@lib/utils/data";
import ArrowLeft from "@components/icon/arrow-left";
import UpdateDialog from "./update";

type RoleHeaderProps = {
  params: {
    id: string;
  };
};

export default async function RoleHeader(props: RoleHeaderProps) {
  const [role, categories, languages] = await Promise.all([
    getChatRole(parseInt(props.params.id)),
    getChatCategoryCollection(),
    getLanguageCollection(),
  ]);

  return (
    <>
      <NextLink
        className="block shrink-0 rounded-full p-1.5 transition-colors hover:bg-slate-600 active:bg-slate-600"
        href="/chat/roles"
      >
        <ArrowLeft size={24} />
      </NextLink>
      <h1 className="max-w-xs truncate text-3xl font-medium tracking-wide">{role.name}</h1>
      <UpdateDialog categories={categories} languages={languages} role={role} />
    </>
  );
}
