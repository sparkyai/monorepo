import { getTextTemplate, getTextTemplateMessagesCollection } from "@lib/utils/data";
import { getModels } from "@lib/utils/gpt";
import { GenerationProvider, GenerationTrigger } from "./generation";
import Context from "./context";
import Options from "./options";
import Input from "./input";
import Content from "./content";

type TemplateProps = {
  params: {
    id: string;
  };
};

export default async function Template(props: TemplateProps) {
  const [template, messages, models] = await Promise.all([
    getTextTemplate(parseInt(props.params.id)),
    getTextTemplateMessagesCollection(parseInt(props.params.id)),
    getModels(),
  ]);

  return (
    <GenerationProvider>
      <div className="-m-6 flex grow overflow-hidden border-t border-slate-700">
        <Content />
        <div className="flex w-80 shrink-0 flex-col gap-3 overflow-y-auto p-4">
          <Context messages={messages} template={template} />
          <Input messages={messages} />
          <Options models={models} template={template} />
          <GenerationTrigger template={template} />
        </div>
      </div>
    </GenerationProvider>
  );
}
