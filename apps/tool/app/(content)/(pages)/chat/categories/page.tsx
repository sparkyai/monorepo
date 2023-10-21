import { getLanguageCollection, getChatCategoryCollection } from "@lib/utils/data";
import Collection from "./collection";

export default async function Categories() {
  const [categories, languages] = await Promise.all([getChatCategoryCollection(), getLanguageCollection()]);

  return <Collection categories={categories} languages={languages} />;
}
