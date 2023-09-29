type FailureData = {
  errCode?: string;
  errText?: string;
};

async function request<T>(url: string, method: "get" | "delete"): Promise<T>;
async function request<T>(url: string, method: "put" | "post", data?: object): Promise<T>;
async function request<T extends object>(url: string, method: string, payload?: object) {
  const response = await fetch(`https://api.monobank.ua/api${url}`, {
    next: { revalidate: 0 },
    body: payload ? JSON.stringify(payload) : void 0,
    method,
    headers: {
      "X-Token": process.env.MONOBANK_API_KEY || "",
    },
  });

  const data: T | FailureData = await response.json();

  if (!response.ok || "errText" in data) {
    throw new Error((data as FailureData).errText || "Monobank Internal Error");
  }

  return data;
}

export default {
  async get<T>(url: string): Promise<T> {
    return request(url, "get");
  },

  async post<T>(url: string, data?: object): Promise<T> {
    return request(url, "post", data);
  },
};
