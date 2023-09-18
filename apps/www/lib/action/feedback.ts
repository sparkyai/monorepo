"use server";

import api from "lib/data/api";

export async function save(data: FormData) {
  await api.post("/feedbacks", {
    name: data.get("name"),
    email: data.get("email"),
    message: data.get("message"),
  });
}
