import { getLanguageCollection, getChatRoleCollection, getChatCategoryCollection } from "@lib/utils/data";
import Collection from "./collection";

export default async function Roles() {
  const [roles, categories, languages] = await Promise.all([
    getChatRoleCollection(),
    getChatCategoryCollection(),
    getLanguageCollection(),
  ]);

  return <Collection categories={categories} languages={languages} roles={roles} />;
}
