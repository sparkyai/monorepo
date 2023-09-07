import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  AIMessagePromptTemplate,
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import type { NextRequest } from "next/server";
import type { ChainValues } from "langchain/schema";
import { BytesOutputParser } from "langchain/schema/output_parser";
import { StreamingTextResponse } from "ai";
import { getTemplate } from "@lib/utils/data";

type TemplateCompletionContext = {
  params: {
    id: string;
  };
};

export async function POST(request: NextRequest, props: TemplateCompletionContext) {
  const input: ChainValues = await request.json();
  const template = await getTemplate(parseInt(props.params.id), true);
  const messages = template.context.map((message) => {
    switch (message.role) {
      case "user":
        return HumanMessagePromptTemplate.fromTemplate(message.content);
      case "system":
        return SystemMessagePromptTemplate.fromTemplate(message.content);
      case "assistant":
        return AIMessagePromptTemplate.fromTemplate(message.content);
    }

    throw new Error("Invalid message role");
  });

  const prompt = ChatPromptTemplate.fromPromptMessages(messages);
  const model = new ChatOpenAI({
    topP: template.topP,
    maxTokens: -1,
    streaming: true,
    modelName: template.model,
    temperature: template.temperature,
    openAIApiKey: process.env.OPENAI_API_KEY,
    presencePenalty: template.presentPenalty,
    frequencyPenalty: template.frequencyPenalty,

    verbose: true,
  });

  const chain = prompt.pipe(model).pipe(new BytesOutputParser());
  const stream = await chain.stream(input);

  request.signal.addEventListener("abort", () => {
    void stream.cancel("cancel").catch(() => void 0);
  });

  return new StreamingTextResponse(stream);
}
