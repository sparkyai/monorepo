import type { NextRequest } from "next/server";
import type { ChainValues } from "langchain/schema";
import { StreamingTextResponse } from "ai";
import { getTemplate } from "@lib/utils/data";
import type { ChatMessage } from "@lib/utils/langchain";
import { getChatResponse } from "@lib/utils/langchain";

type TemplateCompletionContext = {
  params: {
    id: string;
  };
};

export async function POST(request: NextRequest, props: TemplateCompletionContext) {
  const input: ChainValues = await request.json();
  const template = await getTemplate(parseInt(props.params.id), true);
  const options = {
    topP: template.top_p,
    modelName: template.model,
    temperature: template.temperature,
    presencePenalty: template.present_penalty,
    frequencyPenalty: template.frequency_penalty,
  };

  const stream = await getChatResponse(template.context as ChatMessage[], options, input);

  request.signal.addEventListener("abort", () => {
    void stream.cancel("cancel").catch(() => void 0);
  });

  return new StreamingTextResponse(stream);
}
