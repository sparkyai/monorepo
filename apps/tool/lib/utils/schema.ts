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

export const PaginationSchema = z.object({
  limit: z.optional(z.number().positive().int()).default(20),
  start: z.optional(z.number().nonnegative().int()).default(0),
});

export const LanguageSchema = z.object({
  code: z.string(),
  name: z.string(),
});

export const ListQuerySchema = PaginationSchema.extend({
  locale: z.optional(LanguageSchema.shape.code),
});

export const UserSchema = z.object({
  id: z.bigint().or(z.number().int()),
  language: z.optional(z.string().length(2)),
  first_name: z.string().min(1),
  last_name: z.optional(z.string().min(1)),
});

export const PaymentSchema = z.object({
  id: z.string().uuid(),
  amount: z.number().nonnegative(),
  tokens: z.number().nonnegative(),
  status: z.enum(["reversed", "created", "success", "failure", "expired", "hold"]).default("created"),
  provider: z.string().min(1),
});
