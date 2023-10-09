import NextLink from "next/link";
import { getCategories, getLanguages, getTemplate } from "@lib/utils/data";
import ArrowLeft from "@components/icon/arrow-left";
import TemplateEditor from "./edit";

type TemplateHeaderProps = {
  params: {
    id: string;
  };
};

export default async function TemplateHeader(props: TemplateHeaderProps) {
  const [template, categories, languages] = await Promise.all([
    getTemplate(parseInt(props.params.id)),
    getCategories(),
    getLanguages(),
  ]);

  return (
    <>
      <NextLink
        className="block shrink-0 rounded-full p-1.5 transition-colors hover:bg-slate-600 active:bg-slate-600"
        href="/templates"
      >
        <ArrowLeft size={24} />
      </NextLink>
      <h1 className="text-3xl font-medium tracking-wide">{template.name}</h1>
      <TemplateEditor categories={categories} languages={languages} template={template} />
    </>
  );
}
