import api from "./api";

type Model = {
  id: string;
  name: string;
  nsfw: boolean;
  featured: boolean;
  description: string;
  generated_image: null | {
    id: string;
    url: string;
  };
};

export async function getLeonardoModelCollection() {
  const data = await api.get<{ custom_models: Model[] }>("/platformModels");

  return data.custom_models;
}
