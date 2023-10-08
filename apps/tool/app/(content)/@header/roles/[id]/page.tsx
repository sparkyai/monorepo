import { getLanguages, getRole } from "@lib/utils/data";
import RoleEditor from "./edit";

type RoleHeaderProps = {
  params: {
    id: string;
  };
};

export default async function RoleHeader(props: RoleHeaderProps) {
  const [role, languages] = await Promise.all([getRole(parseInt(props.params.id)), getLanguages()]);

  return (
    <>
      <h1 className="text-3xl font-medium tracking-wide">{role.name}</h1>
      <RoleEditor languages={languages} role={role} />
    </>
  );
}
