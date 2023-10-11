async function request<T>(url: string, method: "get" | "delete"): Promise<T>;
async function request<T>(url: string, method: "put" | "post", data?: object): Promise<T>;
async function request(url: string, method: string, payload?: object) {
  const response = await fetch(`${process.env.TOOL_URL}/api/${url}`, {
    next: { revalidate: 0 },
    body: payload ? JSON.stringify(payload) : void 0,
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  }

  throw new Error("Tool Internal Error");
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
