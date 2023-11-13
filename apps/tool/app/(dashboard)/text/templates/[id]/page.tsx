import { notFound } from "next/navigation";
import { getGPTModelCollection } from "@lib/utils/gpt";
import prisma from "@lib/utils/prisma";
import { GenerationProvider, GenerationTrigger } from "./generation";
import Content from "./content";
import Context from "./context";
import Options from "./options";
import Input from "./input";

type TemplateProps = {
  params: {
    id: string;
  };
};

export default async function Template(props: TemplateProps) {
  const [template, models] = await Promise.all([
    prisma.text_templates.findUnique({
      where: { id: Number(props.params.id) },
      select: {
        id: true,
        name: true,
        messages: {
          select: {
            id: true,
            role: true,
            content: true,
          },
        },
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

  if (!template) {
    notFound();
  }

  return (
    <GenerationProvider>
      <div className="-m-6 flex grow overflow-hidden border-t border-slate-700">
        <Content />
        <div className="flex w-80 shrink-0 flex-col gap-3 overflow-y-auto p-4">
          <Context template={template} />
          <Input messages={template.messages} />
          <Options models={models} template={template} />
          <GenerationTrigger template={template} />
        </div>
      </div>
    </GenerationProvider>
  );
}
