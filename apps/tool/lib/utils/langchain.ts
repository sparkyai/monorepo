import { ChatOpenAI } from "langchain/chat_models/openai";
import type { ChainValues } from "langchain/schema";
import {
  AIMessagePromptTemplate,
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { BytesOutputParser } from "langchain/schema/output_parser";

const MESSAGES = {
  user: HumanMessagePromptTemplate,
  system: SystemMessagePromptTemplate,
  assistant: AIMessagePromptTemplate,
};

export type ChatMessage = {
  role: keyof typeof MESSAGES;
  content: string;
};

export type ChatOptions = {
  topP: number;
  modelName: string;
  temperature: number;
  presencePenalty: number;
  frequencyPenalty: number;
};

export async function getChatResponse(messages: ChatMessage[], options: ChatOptions, input: ChainValues) {
  const model = new ChatOpenAI({
    ...options,
    maxTokens: -1,
    streaming: true,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
  const prompt = ChatPromptTemplate.fromPromptMessages(
    messages.map((message) => MESSAGES[message.role].fromTemplate(message.content)),
  );

  return prompt.pipe(model).pipe(new BytesOutputParser()).stream(input);
}
