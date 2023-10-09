import type { NextRequest } from "next/server";
import { StreamingTextResponse } from "ai";
import { parse } from "qs";
import { getRole } from "@lib/utils/data";
import { getChatResponse } from "@lib/utils/langchain";

type RoleProps = {
  params: {
    id: string;
  };
};

export async function POST(request: NextRequest, props: RoleProps) {
  const role = await getRole(parseInt(props.params.id), true);
  const options = {
    topP: role.top_p,
    modelName: role.model,
    temperature: role.temperature,
    presencePenalty: role.present_penalty,
    frequencyPenalty: role.frequency_penalty,
  };

  const stream = await getChatResponse(await request.json(), options, parse(request.nextUrl.search.slice(1)));

  request.signal.addEventListener("abort", () => {
    void stream.cancel("cancel").catch(() => void 0);
  });

  return new StreamingTextResponse(stream);
}
