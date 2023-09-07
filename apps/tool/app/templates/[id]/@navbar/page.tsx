import { getCategories, getTemplate } from "@lib/utils/data";
import { PreviewAction } from "../preview";
import TemplateNavbarSettings from "./settings";

type TemplateNavbarProps = {
  params: {
    id: string;
  };
};

export default async function TemplateNavbar(props: TemplateNavbarProps) {
  const [template, categories] = await Promise.all([getTemplate(parseInt(props.params.id)), getCategories()]);

  return (
    <header className="flex gap-3 bg-stone-800 px-4 py-3">
      <h2 className="self-start text-xl font-bold tracking-wider">{template.name}</h2>
      <TemplateNavbarSettings categories={categories} template={{ ...template, category: template.category?.name }} />
      <PreviewAction template={template} />
    </header>
  );
}
