import api from "./api";

type Social = {
  id: number;
  url: string;
  name: string;
};

export async function getSocialCollection(locale: string) {
  return api.get<Social[]>(`/socials?locale=${locale}`);
}
