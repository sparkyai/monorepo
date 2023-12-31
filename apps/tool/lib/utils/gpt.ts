import { env } from "@sparky/env";

type Model = {
  id: string;
  object: string;
  created: number;
  owned_by: string;
};

type ModelsResponse = {
  data: Model[];
};

export async function getGPTModelCollection() {
  const response = await fetch("https://api.openai.com/v1/models", {
    next: {
      revalidate: 1440,
    },
    headers: {
      Authorization: `Bearer ${env("OPENAI_API_KEY")}`,
    },
  });

  const { data } = (await response.json()) as ModelsResponse;

  return data.map((model) => model.id).filter((model) => model.includes("gpt"));
}
