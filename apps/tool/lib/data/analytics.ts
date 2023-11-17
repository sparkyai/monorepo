import type { TypeOf } from "zod";
import { z } from "zod";
import prisma from "@lib/utils/prisma";

export const AnalyticPeriodSchema = z.enum(["day", "week", "month", "year"]);

const fields = {
  day: "hour",
  week: "hour", // 8 hour
  month: "day",
  year: "week",
};

type TokenUsage = {
  date: Date;
  image_tokens: number;
  prompt_tokens: number;
  completion_tokens: number;
};

type GenerationUsage = {
  date: Date;
  text_generations: number;
  chat_generations: number;
  image_generations: number;
};

export async function getTelegramUserTokenUsage(id: number, period: TypeOf<typeof AnalyticPeriodSchema>) {
  const interval = `1 ${period}`;

  return prisma.$queryRaw<TokenUsage[]>`
      SELECT date_trunc(${fields[period]}, usage.date) date,
             sum(usage.image_tokens)      image_tokens,
             sum(usage.prompt_tokens)     prompt_tokens,
             sum(usage.completion_tokens) completion_tokens
      FROM (SELECT cu.created_at date, 0 image_tokens, sum (cu.prompt_tokens) prompt_tokens, sum (cu.completion_tokens) completion_tokens
          FROM public.chat_role_usage cu
          WHERE cu.user_id = ${id}
          AND cu.created_at > now() - ${interval}:: INTERVAL
          GROUP BY 1
          UNION ALL
          SELECT tu.created_at date, 0 image_tokens, sum (tu.prompt_tokens) prompt_tokens, sum (tu.completion_tokens) completion_tokens
          FROM public.text_template_usage tu
          WHERE tu.user_id = ${id}
          AND tu.created_at > now() - ${interval}:: INTERVAL
          GROUP BY 1
          UNION ALL
          SELECT iu.created_at date, sum (iu.tokens) image_tokens, 0 prompt_tokens, 0 completion_tokens
          FROM public.image_template_usage iu
          WHERE iu.user_id = ${id}
          AND iu.created_at > now() - ${interval}:: INTERVAL
          GROUP BY 1) usage
      GROUP BY 1;
  `;
}

export async function getTelegramUserGenerationUsage(id: number, period: TypeOf<typeof AnalyticPeriodSchema>) {
  const interval = `1 ${period}`;

  return prisma.$queryRaw<GenerationUsage[]>`
      SELECT date_trunc(${fields[period]}, usage.date) date,
       sum(usage.chat_generations)                           chat_generations,
       sum(usage.text_generations)                           text_generations,
       sum(usage.image_generations)                          image_generations
      FROM (SELECT cu.created_at date, count (cu) chat_generations, 0 text_generations, 0 image_generations
          FROM public.chat_role_usage cu
          WHERE cu.user_id = ${id}
          AND cu.created_at > now() - ${interval}:: INTERVAL
          GROUP BY 1
          UNION ALL
          SELECT tu.created_at date, 0 chat_generations, count (tu) text_generations, 0 image_generations
          FROM public.text_template_usage tu
          WHERE tu.user_id = ${id}
          AND tu.created_at > now() - ${interval}:: INTERVAL
          GROUP BY 1
          UNION ALL
          SELECT iu.created_at date, 0 chat_generations, 0 text_generations, count (iu) image_generations
          FROM public.image_template_usage iu
          WHERE iu.user_id = ${id}
          AND iu.created_at > now() - ${interval}:: INTERVAL
          GROUP BY 1) usage
      GROUP BY 1;
  `;
}

export async function getImageTemplateTokenUsage(id: number, period: TypeOf<typeof AnalyticPeriodSchema>) {
  const interval = `1 ${period}`;

  return prisma.$queryRaw<Pick<TokenUsage, "date" | "image_tokens">[]>`
      SELECT date_trunc(${fields[period]}, iu.created_at) date, sum (iu.tokens) image_tokens
      FROM public.image_template_usage iu
      WHERE iu.template_id = ${id}
        AND iu.created_at
          > now() - ${interval}:: INTERVAL
      GROUP BY 1;
  `;
}

export async function getImageTemplateGenerationUsage(id: number, period: TypeOf<typeof AnalyticPeriodSchema>) {
  const interval = `1 ${period}`;

  return prisma.$queryRaw<Pick<GenerationUsage, "date" | "image_generations">[]>`
      SELECT date_trunc(${fields[period]}, iu.created_at) date, count (iu) image_generations
      FROM public.image_template_usage iu
      WHERE iu.template_id = ${id}
        AND iu.created_at
          > now() - ${interval}:: INTERVAL
      GROUP BY 1;
  `;
}

export async function getTextTemplateTokenUsage(id: number, period: TypeOf<typeof AnalyticPeriodSchema>) {
  const interval = `1 ${period}`;

  return prisma.$queryRaw<Omit<TokenUsage, "image_tokens">[]>`
      SELECT date_trunc(${fields[period]}, tu.created_at) date,
       sum(tu.prompt_tokens)                        prompt_tokens,
       sum(tu.completion_tokens)                    completion_tokens
      FROM public.text_template_usage tu
      WHERE tu.template_id = ${id}
        AND tu.created_at
          > now() - ${interval}:: INTERVAL
      GROUP BY 1;
  `;
}

export async function getTextTemplateGenerationUsage(id: number, period: TypeOf<typeof AnalyticPeriodSchema>) {
  const interval = `1 ${period}`;

  return prisma.$queryRaw<Omit<GenerationUsage, "image_generations">[]>`
      SELECT date_trunc(${fields[period]}, tu.created_at) date, count(tu) image_generations
      FROM public.text_template_usage tu
      WHERE tu.template_id = ${id}
        AND tu.created_at
          > now() - ${interval}:: INTERVAL
      GROUP BY 1;
  `;
}

export async function getTextCategoryTokenUsage(id: number, period: TypeOf<typeof AnalyticPeriodSchema>) {
  const interval = `1 ${period}`;

  return prisma.$queryRaw<Omit<TokenUsage, "image_tokens">[]>`
      SELECT date_trunc(${fields[period]}, tu.created_at) date,
       sum(tu.prompt_tokens)                        prompt_tokens,
       sum(tu.completion_tokens)                    completion_tokens
      FROM public.text_template_usage tu
          INNER JOIN public.text_templates tt
      ON tt.id = tu.template_id
          INNER JOIN public.text_categories tc ON tc.id = tt.category_id
      WHERE tc.id = ${id}
        AND tu.created_at
          > now() - ${interval}:: INTERVAL
      GROUP BY 1;
  `;
}

export async function getTextCategoryGenerationUsage(id: number, period: TypeOf<typeof AnalyticPeriodSchema>) {
  const interval = `1 ${period}`;

  return prisma.$queryRaw<Omit<GenerationUsage, "image_generations">[]>`
      SELECT date_trunc(${fields[period]}, tu.created_at) date, count(tu) image_generations
      FROM public.text_template_usage tu
          INNER JOIN public.text_templates tt
      ON tt.id = tu.template_id
          INNER JOIN public.text_categories tc ON tc.id = tt.category_id
      WHERE tc.id = ${id}
        AND tu.created_at
          > now() - ${interval}:: INTERVAL
      GROUP BY 1;
  `;
}

export async function getChatRoleTokenUsage(id: number, period: TypeOf<typeof AnalyticPeriodSchema>) {
  const interval = `1 ${period}`;

  return prisma.$queryRaw<Omit<TokenUsage, "image_tokens">[]>`
      SELECT date_trunc(${fields[period]}, cu.created_at) date,
       sum(cu.prompt_tokens)                        prompt_tokens,
       sum(cu.completion_tokens)                    completion_tokens
      FROM public.chat_role_usage cu
      WHERE cu.role_id = ${id}
        AND cu.created_at
          > now() - ${interval}:: INTERVAL
      GROUP BY 1;
  `;
}

export async function getChatRoleGenerationUsage(id: number, period: TypeOf<typeof AnalyticPeriodSchema>) {
  const interval = `1 ${period}`;

  return prisma.$queryRaw<Omit<GenerationUsage, "image_generations">[]>`
      SELECT date_trunc(${fields[period]}, cu.created_at) date, count(cu) image_generations
      FROM public.chat_role_usage cu
      WHERE cu.role_id = ${id}
        AND cu.created_at
          > now() - ${interval}:: INTERVAL
      GROUP BY 1;
  `;
}

export async function getChatCategoryTokenUsage(id: number, period: TypeOf<typeof AnalyticPeriodSchema>) {
  const interval = `1 ${period}`;

  return prisma.$queryRaw<Omit<TokenUsage, "image_tokens">[]>`
      SELECT date_trunc(${fields[period]}, cu.created_at) date,
       sum(cu.prompt_tokens)                        prompt_tokens,
       sum(cu.completion_tokens)                    completion_tokens
      FROM public.chat_role_usage cu
          INNER JOIN public.chat_roles cr
      ON cr.id = cu.role_id
          INNER JOIN public.chat_categories cc ON cc.id = cr.category_id
      WHERE cc.id = ${id}
        AND cu.created_at
          > now() - ${interval}:: INTERVAL
      GROUP BY 1;
  `;
}

export async function getChatCategoryGenerationUsage(id: number, period: TypeOf<typeof AnalyticPeriodSchema>) {
  const interval = `1 ${period}`;

  return prisma.$queryRaw<Omit<GenerationUsage, "image_generations">[]>`
      SELECT date_trunc(${fields[period]}, cu.created_at) date, count(cu) image_generations
      FROM public.chat_role_usage cu
          INNER JOIN public.chat_roles cr
      ON cr.id = cu.role_id
          INNER JOIN public.chat_categories cc ON cc.id = cr.category_id
      WHERE cc.id = ${id}
        AND cu.created_at
          > now() - ${interval}:: INTERVAL
      GROUP BY 1;
  `;
}

export async function getTokenUsage(period: TypeOf<typeof AnalyticPeriodSchema>) {
  const interval = `1 ${period}`;

  return prisma.$queryRaw<Omit<TokenUsage, "image_tokens">[]>`
      SELECT date_trunc(${fields[period]}, usage.date) date,
             sum(usage.image_tokens)      image_tokens,
             sum(usage.prompt_tokens)     prompt_tokens,
             sum(usage.completion_tokens) completion_tokens
      FROM (SELECT cu.created_at date, 0 image_tokens, sum (cu.prompt_tokens) prompt_tokens, sum (cu.completion_tokens) completion_tokens
          FROM public.chat_role_usage cu
          WHERE cu.created_at > now() - ${interval}:: INTERVAL
          GROUP BY 1
          UNION ALL
          SELECT tu.created_at date, 0 image_tokens, sum (tu.prompt_tokens) prompt_tokens, sum (tu.completion_tokens) completion_tokens
          FROM public.text_template_usage tu
          WHERE tu.created_at > now() - ${interval}:: INTERVAL
          GROUP BY 1
          UNION ALL
          SELECT iu.created_at date, sum (iu.tokens) image_tokens, 0 prompt_tokens, 0 completion_tokens
          FROM public.image_template_usage iu
          WHERE iu.created_at > now() - ${interval}:: INTERVAL
          GROUP BY 1) usage
      GROUP BY 1;
  `;
}

export async function getGenerationUsage(period: TypeOf<typeof AnalyticPeriodSchema>) {
  const interval = `1 ${period}`;

  return prisma.$queryRaw<Omit<GenerationUsage, "image_generations">[]>`
      SELECT date_trunc(${fields[period]}, usage.date) date,
       sum(usage.chat_generations)                           chat_generations,
       sum(usage.text_generations)                           text_generations,
       sum(usage.image_generations)                          image_generations
      FROM (SELECT cu.created_at date, count (cu) chat_generations, 0 text_generations, 0 image_generations
          FROM public.chat_role_usage cu
          WHERE cu.created_at > now() - ${interval}:: INTERVAL
          GROUP BY 1
          UNION ALL
          SELECT tu.created_at date, 0 chat_generations, count (tu) text_generations, 0 image_generations
          FROM public.text_template_usage tu
          WHERE tu.created_at > now() - ${interval}:: INTERVAL
          GROUP BY 1
          UNION ALL
          SELECT iu.created_at date, 0 chat_generations, 0 text_generations, count (iu) image_generations
          FROM public.image_template_usage iu
          WHERE iu.created_at > now() - ${interval}:: INTERVAL
          GROUP BY 1) usage
      GROUP BY 1;
  `;
}
