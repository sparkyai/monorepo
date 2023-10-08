import { getCategories, getLanguages, getTemplate } from "@lib/utils/data";
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
      <h1 className="text-3xl font-medium tracking-wide">{template.name}</h1>
      <TemplateEditor categories={categories} languages={languages} template={template} />
    </>
  );
}
