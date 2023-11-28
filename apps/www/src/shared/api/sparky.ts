import { env } from "@sparky/env";

async function request<T>(path: string, method: string, payload: unknown, options?: object): Promise<T> {
  const response = await fetch(`${env("API_URL")}${path}`, {
    next: { tags: ["api"], revalidate: 604800 },
    body: payload ? JSON.stringify(payload) : void 0,
    method,
    ...options,
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  }

  throw new Error("error" in data ? data.error : "Server Internal Error");
}

export default {
  get: <T>(path: string, options?: object) => request<T>(path, "GET", void 0, options),
  put: <T>(path: string, data: unknown, options?: object) => request<T>(path, "PUT", data, options),
  post: <T>(path: string, data: unknown, options?: object) => request<T>(path, "POST", data, options),
};
