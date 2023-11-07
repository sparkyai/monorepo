import type { NextRequest } from "next/server";
import type { ChainValues } from "langchain/schema";
import { StreamingTextResponse } from "ai";
import { z } from "zod";
import { getTextTemplate } from "@lib/utils/data";
import { GPTChatCompletion } from "@lib/utils/langchain";
import { GPTParametersSchema } from "@lib/utils/schema";

const input = z.record(z.string());

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function POST(request: NextRequest, props: TemplateProps) {
  const data: ChainValues = input.parse(await request.json());
  const template = await getTextTemplate(parseInt(props.params.id));

  const stream = await GPTChatCompletion(template.messages, GPTParametersSchema.parse(template.parameters), data);

  request.signal.addEventListener("abort", () => {
    void stream.cancel("cancel").catch(() => void 0);
  });

  return new StreamingTextResponse(stream);
}
