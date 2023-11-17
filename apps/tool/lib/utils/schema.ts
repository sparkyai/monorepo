import { z } from "zod";

export const interaction = z.object({
  type: z.enum(["like", "dislike", "generate", "regenerate"]),
  client: z.object({
    id: z.number().positive(),
  }),
});

export const AnalyticPeriod = z.enum(["day", "week", "month", "year"]);

export const LanguageSchema = z.object({
  code: z.string().length(2),
  name: z.string().min(1),
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
  show_notification: z.optional(z.boolean()),
});

export const PaymentSchema = z.object({
  id: z.string().uuid(),
  amount: z.number().nonnegative().int(),
  tokens: z.number().nonnegative().int(),
  status: z.enum(["reversed", "created", "success", "failure", "expired", "hold"]).default("created"),
  method: z.string().min(1),
});

export const ImageSchema = z.object({
  mime: z.string().min(1),
  width: z.number().positive().int(),
  height: z.number().positive().int(),
  s3_key: z.string().min(1),
});

export const GPTParametersSchema = z.object({
  model: z.string().min(1),
  top_p: z.number().min(0).max(1),
  temperature: z.number().min(0).max(2),
  present_penalty: z.number().min(0).max(2),
  frequency_penalty: z.number().min(0).max(2),
});

export const ChatRoleSchema = z.object({
  name: z.string().min(1),
  prompt: z.optional(z.string()),
  poster: z.optional(z.nullable(ImageSchema)),
  category: z.number().positive(),
  language: LanguageSchema.shape.code,
  parameters: z.optional(GPTParametersSchema),
  description: z.optional(z.string()),
});

export const ChatCategorySchema = z.object({
  name: z.string().min(1),
  language: LanguageSchema.shape.code,
});

export const ImageTemplateSchema = z.object({
  name: z.string().min(1),
  model: z.optional(z.nullable(z.string().min(1))),
  poster: z.optional(z.nullable(ImageSchema)),
  provider: z.string().min(1),
  language: LanguageSchema.shape.code,
  description: z.optional(z.string()),
});

export const MessageSchema = z.object({
  role: z.string().min(1),
  content: z.string(),
});

export const TextTemplateSchema = z.object({
  name: z.string().min(1),
  poster: z.optional(z.nullable(ImageSchema)),
  category: z.number().positive(),
  language: LanguageSchema.shape.code,
  parameters: z.optional(GPTParametersSchema),
  description: z.optional(z.nullable(z.string())),
});

export const TextCategorySchema = z.object({
  name: z.string().min(1),
  language: LanguageSchema.shape.code,
});
