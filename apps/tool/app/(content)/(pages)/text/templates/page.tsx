import { getTextTemplateCollection, getTextCategoryCollection, getLanguageCollection } from "@lib/utils/data";
import Collection from "./collection";

export default async function Templates() {
  const [templates, categories, languages] = await Promise.all([
    getTextTemplateCollection(),
    getTextCategoryCollection(),
    getLanguageCollection(),
  ]);

  return <Collection categories={categories} languages={languages} templates={templates} />;
}
