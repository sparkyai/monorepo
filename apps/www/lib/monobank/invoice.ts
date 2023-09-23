async function request(path: string, method: string, payload?: object) {
  const response = await fetch(`https://api.monobank.ua${path}`, {
    body: payload ? JSON.stringify(payload) : void 0,
    method,
    headers: {
      "X-Token": process.env.MONOBANK_API_KEY || "",
    },
  });

  const data = await response.json();

  if ("errText" in data) {
    throw new Error(data.errText);
  }

  if (response.ok) {
    return data;
  }

  throw new Error("Internal Server Error");
}

type CreateInvoiceResponse = {
  pageUrl: string;
  invoiceId: string;
};

export async function createInvoice(amount: number, _locale: string): Promise<CreateInvoiceResponse> {
  return request("/api/merchant/invoice/create", "POST", {
    // redirectUrl: `${process.env.WWW_URL}/${locale}/gratitude`,
    amount,
    ccy: 840,
  });
}
