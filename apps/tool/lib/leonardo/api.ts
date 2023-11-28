import { env } from "@sparky/env";

async function request<T>(url: string, method: "get" | "delete"): Promise<T>;
async function request<T>(url: string, method: "put" | "post", data?: object): Promise<T>;
async function request(url: string, method: string, payload?: object) {
  const response = await fetch(`https://cloud.leonardo.ai/api/rest/v1${url}`, {
    next: { revalidate: 3600 },
    body: payload ? JSON.stringify(payload) : void 0,
    method,
    headers: {
      Authorization: `Bearer ${env("LEONARDO_API_KEY")}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (response.ok && !data.error) {
    return data;
  }

  throw new Error(data?.error || "Internal Leonardo Error");
}

export default {
  async get<T>(url: string): Promise<T> {
    return request(url, "get");
  },

  async delete<T>(url: string): Promise<T> {
    return request(url, "delete");
  },

  async put<T>(url: string, data?: object): Promise<T> {
    return request(url, "put", data);
  },

  async post<T>(url: string, data?: object): Promise<T> {
    return request(url, "post", data);
  },
};
