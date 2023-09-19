import api from "./api";

type Locale = {
  id: number;
  name: string;
  code: string;
  isDefault: boolean;
};

export async function getLocaleCollection() {
  return api.get<Locale[]>("/locales");
}
