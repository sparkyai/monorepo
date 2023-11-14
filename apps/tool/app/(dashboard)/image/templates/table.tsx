import { Fragment } from "react";
import type { Prisma } from "@prisma/client";
import TableHeader from "@components/table/header";
import TableRow from "@components/table/row";
import TablePagination from "@components/table/pagination";
import TableWrap from "@components/table/wrap";
import prisma from "@lib/utils/prisma";
import { getLanguageCollection } from "@lib/data/language";
import { getLeonardoModelCollection } from "@lib/leonardo/model";
import { getObjectUrl } from "@lib/utils/s3";
import TemplateAnalytics from "./analytics";
import DeleteTemplate from "./delete";
import UpdateTemplate from "./update";

type TableProps = {
  page: number;
  limit: number;
  query?: string;
  locale?: string;
  provider?: string;
};

export default async function Table(props: TableProps) {
  const start = (props.page - 1) * props.limit;
  const where = {
    name: props.query ? { contains: props.query, mode: "insensitive" } : void 0,
    language: props.locale ? { code: props.locale } : void 0,
    provider: props.provider ? { contains: props.provider, mode: "insensitive" } : void 0,
  } satisfies Prisma.image_templatesWhereInput;

  const [total, templates, language, leonardo] = await Promise.all([
    prisma.image_templates.count({ where }),
    prisma.image_templates.findMany({
      skip: start,
      take: props.limit,
      where,
      select: {
        id: true,
        name: true,
        model: true,
        poster: {
          select: {
            mime: true,
            width: true,
            height: true,
            s3_key: true,
          },
        },
        provider: true,
        language: {
          select: {
            code: true,
            name: true,
          },
        },
        description: true,
      },
      orderBy: { id: "desc" },
    }),
    getLanguageCollection(),
    getLeonardoModelCollection(),
  ]);

  const reactions = await prisma.image_template_reactions.groupBy({
    by: ["type", "template_id"],
    where: {
      template: {
        id: { in: templates.map((role) => role.id) },
      },
    },
    _count: true,
  });

  return (
    <TableWrap className="grid-cols-[2fr_1fr_1fr_1fr_auto]">
      <TableHeader actions values={["Name", "Provider", "Language", "Reaction"]} />

      {templates.length < 1 && (
        <p className="col-span-full border-t border-slate-700 px-4 py-12 text-center text-slate-400">
          Template list is empty
        </p>
      )}
      {templates.map((template) => {
        const update = {
          ...template,
          poster: template.poster ? getObjectUrl(template.poster.s3_key) : null,
        };

        const reaction = {
          like: 0,
          dislike: 0,
        };

        for (const item of reactions) {
          if (item.template_id === template.id) {
            reaction[item.type] = item._count;
          }
        }

        return (
          <TableRow
            key={template.id}
            values={[
              template.name,
              template.provider,
              template.language.name,
              <Fragment key={`:reaction:template:${template.id}:`}>
                <span className="text-lime-500">{reaction.like}</span>
                {" / "}
                <span className="text-rose-500">{reaction.dislike}</span>
              </Fragment>,
              <Fragment key={`:actions:template:${template.id}:`}>
                <TemplateAnalytics template={template} />
                <UpdateTemplate languages={language} leonardo={leonardo} template={update} />
                <DeleteTemplate template={template} />
              </Fragment>,
            ]}
          />
        );
      })}

      <TablePagination
        end={start + templates.length}
        page={props.page}
        start={Math.min(start + 1, total)}
        total={total}
      />
    </TableWrap>
  );
}
