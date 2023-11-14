import { notFound } from "next/navigation";
import SidebarGroup from "@components/sidebar/group";
import { getGPTModelCollection } from "@lib/utils/gpt";
import prisma from "@lib/utils/prisma";
import Options from "./options";
import Chat from "./chat";
import Prompt from "./prompt";

type RoleProps = {
  params: {
    id: string;
  };
};

export default async function Role(props: RoleProps) {
  const [role, models] = await Promise.all([
    prisma.chat_roles.findUnique({
      where: { id: Number(props.params.id) },
      select: {
        id: true,
        name: true,
        prompt: true,
        parameters: {
          select: {
            top_p: true,
            model: true,
            temperature: true,
            present_penalty: true,
            frequency_penalty: true,
          },
        },
      },
    }),
    getGPTModelCollection(),
  ]);

  if (!role) {
    notFound();
  }

  return (
    <div className="-m-6 flex grow overflow-hidden border-t border-slate-700">
      <div className="flex grow flex-col overflow-hidden border-r border-slate-700">
        <Chat role={role} />
      </div>
      <div className="flex w-80 shrink-0 flex-col gap-3 overflow-y-auto p-4">
        <SidebarGroup name="Context">
          <Prompt role={role} />
        </SidebarGroup>
        <SidebarGroup name="Options">
          <Options models={models} role={role} />
        </SidebarGroup>
      </div>
    </div>
  );
}
