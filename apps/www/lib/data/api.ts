import type { StaticImageData } from "next/image";

export type ImageData = {
  src: string;
  alt: string;
  name: string;
  mime: string;
  width: number;
  height: number;
  placeholder: string;
};

export function getStaticImageData(data: ImageData): StaticImageData {
  return {
    src: data.src,
    width: data.width,
    height: data.height,
    blurWidth: 10,
    blurHeight: 10,
    blurDataURL: data.placeholder,
  };
}

async function request<T>(path: string, method: string, payload: unknown, options?: object): Promise<T> {
  const response = await fetch(`${process.env.API_URL}${path}`, {
    next: { revalidate: 0 },
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
