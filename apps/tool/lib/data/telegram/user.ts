import prisma from "@lib/utils/prisma";

type Usage = {
  tokens: string;
};

export async function getTokenBalance(id: number | bigint) {
  const usage = await prisma.$queryRaw<Usage[]>`
      SELECT sum(usage.tokens) as tokens
      FROM (SELECT coalesce(sum(p.tokens), 0) AS tokens
            FROM public.payments p
            WHERE p.user_id = ${id}
              AND p.status = 'success'
            UNION ALL
            SELECT coalesce(sum(-cu.completion_tokens), 0) AS tokens
            FROM public.chat_role_usage cu
            WHERE cu.user_id = ${id}
            UNION ALL
            SELECT coalesce(sum(-tu.completion_tokens), 0) AS tokens
            FROM public.text_template_usage tu
            WHERE tu.user_id = ${id}
            UNION ALL
            SELECT coalesce(sum(-iu.tokens), 0) AS tokens
            FROM public.image_template_usage iu
            WHERE iu.user_id = ${id}) usage
  `;

  return usage.reduce((balance, item) => balance + Number(item.tokens), 0);
}
