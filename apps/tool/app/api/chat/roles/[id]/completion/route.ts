import type { NextRequest } from "next/server";
import { StreamingTextResponse } from "ai";
import { z } from "zod";
import { GPTChatCompletion } from "@lib/utils/langchain";
import prisma from "@lib/utils/prisma";

const messages = z.array(
  z.object({
    role: z.string(),
    content: z.string(),
  }),
);

type RoleProps = {
  params: {
    id: string;
  };
};

export async function POST(request: NextRequest, props: RoleProps) {
  const data = messages.parse(await request.json());

  const parameters = await prisma.chat_roles
    .findUniqueOrThrow({ where: { id: parseInt(props.params.id) } })
    .parameters();

  const stream = await GPTChatCompletion(data, parameters);

  request.signal.addEventListener("abort", () => {
    void stream.cancel("cancel").catch(() => void 0);
  });

  return new StreamingTextResponse(stream);
}
