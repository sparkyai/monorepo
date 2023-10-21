import NextLink from "next/link";
import { getTextTemplate, getLanguageCollection, getTextCategoryCollection } from "@lib/utils/data";
import ArrowLeft from "@components/icon/arrow-left";
import UpdateDialog from "./update";

type TemplateHeaderProps = {
  params: {
    id: string;
  };
};

export default async function TemplateHeader(props: TemplateHeaderProps) {
  const [template, categories, languages] = await Promise.all([
    getTextTemplate(parseInt(props.params.id)),
    getTextCategoryCollection(),
    getLanguageCollection(),
  ]);

  return (
    <>
      <NextLink
        className="block shrink-0 rounded-full p-1.5 transition-colors hover:bg-slate-600 active:bg-slate-600"
        href="/text/templates"
      >
        <ArrowLeft size={24} />
      </NextLink>
      <h1 className="max-w-xs truncate text-3xl font-medium tracking-wide">{template.name}</h1>
      <UpdateDialog categories={categories} languages={languages} template={template} />
    </>
  );
}
