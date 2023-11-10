import { z } from "zod";

export const interaction = z.object({
  type: z.enum(["like", "dislike", "generate", "regenerate"]),
  client: z.object({
    id: z.number().positive(),
  }),
});

export const LanguageSchema = z.object({
  code: z.string(),
  name: z.string(),
});

export const PaginationSchema = z.object({
  limit: z.optional(z.number().positive().int()).default(20),
  start: z.optional(z.number().nonnegative().int()).default(0),
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
  amount: z.number().nonnegative().int(),
  tokens: z.number().nonnegative().int(),
  status: z.enum(["reversed", "created", "success", "failure", "expired", "hold"]).default("created"),
  method: z.string().min(1),
});

export const ImageSchema = z.object({
  path: z.string(),
  mine: z.string(),
  width: z.number().positive().int(),
  height: z.number().positive().int(),
});

export const GPTParametersSchema = z.object({
  model: z.string(),
  top_p: z.number().min(0).max(1),
  temperature: z.number().min(0).max(2),
  present_penalty: z.number().min(0).max(2),
  frequency_penalty: z.number().min(0).max(2),
});

export const ChatRoleSchema = z.object({
  id: z.number().positive(),
  name: z.number().min(1),
  // usage: 1,
  prompt: z.string(),
  poster: z.optional(ImageSchema),
  // category: 1,
  // language: 1,
  // reactions: 1,
  parameters: z.optional(GPTParametersSchema),
  // description: 1,
});
