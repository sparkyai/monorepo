import type { NextRequest } from "next/server";
import type { ChainValues } from "langchain/schema";
import { StreamingTextResponse } from "ai";
import { z } from "zod";
import { GPTChatCompletion } from "@lib/utils/langchain";
import { GPTParametersSchema } from "@lib/utils/schema";
import prisma from "@lib/utils/prisma";

const input = z.record(z.string());

type TemplateProps = {
  params: {
    id: string;
  };
};

export async function POST(request: NextRequest, props: TemplateProps) {
  const data: ChainValues = input.parse(await request.json());

  const template = await prisma.text_templates.findUniqueOrThrow({
    where: { id: Number(props.params.id) },
    select: {
      messages: {
        select: {
          role: true,
          content: true,
        },
      },
      parameters: {
        select: {
          model: true,
          top_p: true,
          temperature: true,
          present_penalty: true,
          frequency_penalty: true,
        },
      },
    },
  });

  const stream = await GPTChatCompletion(template.messages, GPTParametersSchema.parse(template.parameters), data);

  request.signal.addEventListener("abort", () => {
    void stream.cancel("cancel").catch(() => void 0);
  });

  return new StreamingTextResponse(stream);
}
