import { getLanguages, getRoles } from "@lib/utils/data";
import RolesTable from "./table";

export default async function RolesTitle() {
  const [roles, languages] = await Promise.all([getRoles(), getLanguages()]);

  return <RolesTable languages={languages} roles={roles} />;
}
