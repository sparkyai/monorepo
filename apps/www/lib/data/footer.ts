import api from "./api";

type FooterData = {
  text: string;
};

export async function getFooterData(locale: string) {
  return api.get<FooterData>(`/footer?locale=${locale}`);
}
