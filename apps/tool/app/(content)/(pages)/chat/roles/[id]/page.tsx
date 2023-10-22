import SidebarGroup from "@components/sidebar/group";
import { getModels } from "@lib/utils/gpt";
import { getChatRole } from "@lib/utils/data";
import Options from "./options";
import Prompt from "./prompt";
import Chat from "./chat";

type RoleProps = {
  params: {
    id: string;
  };
};

export default async function Role(props: RoleProps) {
  const [role, models] = await Promise.all([getChatRole(parseInt(props.params.id)), getModels()]);

  return (
    <div className="-m-6 flex grow overflow-hidden border-t border-slate-700">
      <Chat role={role} />
      <div className="flex w-80 shrink-0 flex-col gap-3 overflow-y-auto p-4">
        <SidebarGroup name="Context">
          <Prompt role={role} />
        </SidebarGroup>
        <SidebarGroup name="Options">
          <Options models={models} role={role as never} />
        </SidebarGroup>
      </div>
    </div>
  );
}
