import { getImageTemplates, getLanguages } from "@lib/utils/data";
import { getLeonardoModels } from "@lib/leonardo/model";
import Table from "./table";

export default async function ImageTemplates() {
  const [templates, leonardo, languages] = await Promise.all([
    getImageTemplates(),
    getLeonardoModels(),
    getLanguages(),
  ]);

  return <Table languages={languages} leonardo={leonardo} templates={templates} />;
}
