import { getCategories, getLanguages, getTemplates } from "@lib/utils/data";
import TemplatesTable from "./table";

export default async function Templates() {
  const [templates, categories, languages] = await Promise.all([getTemplates(), getCategories(), getLanguages()]);

  return <TemplatesTable categories={categories} languages={languages} templates={templates} />;
}
