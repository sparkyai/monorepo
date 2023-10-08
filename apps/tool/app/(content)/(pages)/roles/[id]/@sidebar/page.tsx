import { getRole, getTemplate } from "@lib/utils/data";
import { getModels } from "@lib/utils/gpt";
import { PreviewAction } from "../preview";
import TemplateSidebarContext from "./context";
import Options from "../options";

type TemplateSidebarProps = {
  params: {
    id: string;
  };
};

export default async function TemplateSidebar(props: TemplateSidebarProps) {
  const [role, models] = await Promise.all([getRole(parseInt(props.params.id), true), getModels()]);

  return (
    <div className="flex w-80 shrink-0 flex-col gap-3 overflow-y-auto p-4">
      {/*<TemplateSidebarContext messages={template.context} template={template} />*/}
      {/*<TemplateSidebarOptions {...template} models={models} />*/}
      {/*<PreviewAction template={template} />*/}
    </div>
  );
}
