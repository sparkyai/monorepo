export type StrapiImage = {
  url: string;
  name: string;
  mime: string;
  width: number;
  height: number;
  placeholder: string;
  alternativeText: string;
};

export type StrapiEntity<T> = {
  id: number;
  attributes: T;
};

export type StrapiEntityRelation<T> = {
  data: T | null;
};

export type StrapiComponent<T> = T & {
  id: number;
  __component: string;
};

export function getImageData(entity: StrapiEntity<StrapiImage>) {
  const data = getEntityData(entity);

  return {
    src: data.url,
    alt: data.alternativeText,
    name: data.name,
    mime: data.mime,
    width: data.width,
    height: data.height,
    placeholder: data.placeholder,
  };
}

export function getEntityData<T>(entity: StrapiEntity<T>): T & { id: number } {
  return { id: entity.id, ...entity.attributes };
}

async function request<T>(url: string, method: "get" | "delete"): Promise<T>;
async function request<T>(url: string, method: "put" | "post", data?: object): Promise<T>;
async function request(url: string, method: string, payload?: object) {
  const response = await fetch(`${process.env.STRAPI_URL}/api/${url}`, {
    next: { tags: ["strapi"], revalidate: 604800 },
    body: payload ? JSON.stringify({ data: payload }) : void 0,
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { data, meta, error } = await response.json();

  if (response.ok && !error) {
    return { data, meta };
  }

  throw new Error(error?.message || "Strapi Internal Error");
}

type StrapiResponse<D> = {
  data: D;
  meta?: {
    pagination?: {
      page: number;
      total: number;
      pageSize: number;
      pageCount: number;
    };
  };
};

export default {
  async get<T>(url: string): Promise<StrapiResponse<T>> {
    return request(url, "get");
  },

  async delete<T>(url: string): Promise<StrapiResponse<T>> {
    return request(url, "delete");
  },

  async put<T>(url: string, data?: object): Promise<StrapiResponse<T>> {
    return request(url, "put", data);
  },

  async post<T>(url: string, data?: object): Promise<StrapiResponse<T>> {
    return request(url, "post", data);
  },
};
