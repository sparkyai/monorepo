import { getImageTemplateCollection, getLanguageCollection } from "@lib/utils/data";
import { getLeonardoModels } from "@lib/leonardo/model";
import Collection from "./collection";

export default async function ImageTemplates() {
  const [templates, leonardo, languages] = await Promise.all([
    getImageTemplateCollection(),
    getLeonardoModels(),
    getLanguageCollection(),
  ]);

  return <Collection languages={languages} leonardo={leonardo} templates={templates} />;
}
