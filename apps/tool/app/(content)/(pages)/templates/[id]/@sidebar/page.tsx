import { getTemplate } from "@lib/utils/data";
import { getModels } from "@lib/utils/gpt";
import { PreviewAction } from "../preview";
import TemplateSidebarContext from "./context";
import TemplateSidebarOptions from "./options";

type TemplateSidebarProps = {
  params: {
    id: string;
  };
};

export default async function TemplateSidebar(props: TemplateSidebarProps) {
  const [template, models] = await Promise.all([getTemplate(parseInt(props.params.id), true), getModels()]);

  return (
    <div className="flex w-80 shrink-0 flex-col gap-3 overflow-y-auto p-4">
      <TemplateSidebarContext messages={template.context} template={template} />
      <TemplateSidebarOptions {...template} models={models} />
      <PreviewAction template={template} />
    </div>
  );
}
