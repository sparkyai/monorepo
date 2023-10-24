import { ChatOpenAI } from "langchain/chat_models/openai";
import type { ChainValues } from "langchain/schema";
import { ChatPromptTemplate, ChatMessagePromptTemplate } from "langchain/prompts";
import { BytesOutputParser } from "langchain/schema/output_parser";

type Message = {
  role: string;
  content: string;
};

type Parameters = {
  model: string;
  top_p: number;
  temperature: number;
  present_penalty: number;
  frequency_penalty: number;
};

export async function GPTChatCompletion(messages: Message[], parameters: Parameters, input: ChainValues = {}) {
  const model = new ChatOpenAI({
    topP: parameters.top_p,
    maxTokens: -1,
    streaming: true,
    modelName: parameters.model,
    temperature: parameters.temperature,
    presencePenalty: parameters.present_penalty,
    frequencyPenalty: parameters.frequency_penalty,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = ChatPromptTemplate.fromPromptMessages(
    messages.map((message) => ChatMessagePromptTemplate.fromTemplate(message.content, message.role)),
  );

  return prompt.pipe(model).pipe(new BytesOutputParser()).stream(input);
}
