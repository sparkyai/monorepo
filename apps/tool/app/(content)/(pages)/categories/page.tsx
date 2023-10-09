import { getCategories, getLanguages } from "@lib/utils/data";
import CategoriesTable from "./table";

export default async function Categories() {
  const [categories, languages] = await Promise.all([getCategories(), getLanguages()]);

  return <CategoriesTable categories={categories} languages={languages} />;
}
