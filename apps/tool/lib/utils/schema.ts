import { z } from "zod";

export const query = z.object({
  limit: z.optional(
    z
      .string()
      .transform((val) => parseInt(val))
      .refine((val) => val >= 0),
  ),
  offset: z.optional(
    z
      .string()
      .transform((val) => parseInt(val))
      .refine((val) => val >= 0),
  ),
  locale: z.optional(z.string()),
});

export const base = z.object({
  id: z.number().positive(),
  name: z.string(),
});

export const language = z.object({
  code: z.string(),
  name: z.string(),
});

export const message = z.object({
  role: z.string(),
  content: z.string(),
});

export const poster = z.object({
  url: z.string().url(),
});

export const interaction = z.object({
  type: z.enum(["like", "dislike", "generate", "regenerate"]),
  client: z.object({
    id: z.number().positive(),
  }),
});

export const parameters = z.object({
  model: z.string(),
  top_p: z.number().nonnegative(),
  temperature: z.number().nonnegative(),
  present_penalty: z.number().nonnegative(),
  frequency_penalty: z.number().nonnegative(),
});
