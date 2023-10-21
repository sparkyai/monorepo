import { getTextCategoryCollection, getLanguageCollection } from "@lib/utils/data";
import Collection from "./collection";

export default async function Categories() {
  const [categories, languages] = await Promise.all([getTextCategoryCollection(), getLanguageCollection()]);

  return <Collection categories={categories} languages={languages} />;
}
