import { Fragment } from "react";
import type { Prisma } from "@prisma/client";
import TableHeader from "@components/table/header";
import TableRow from "@components/table/row";
import TablePagination from "@components/table/pagination";
import TableWrap from "@components/table/wrap";
import prisma from "@lib/utils/prisma";
import TemplateAnalytics from "./analytics";
import UpdateTemplate from "./update";
import DeleteTemplate from "./delete";

type TableProps = {
  page: number;
  limit: number;
  query?: string;
  locale?: string;
  category?: string;
};

export default async function Table(props: TableProps) {
  const start = (props.page - 1) * props.limit;

  const where = {
    name: props.query ? { contains: props.query, mode: "insensitive" } : void 0,
    language: props.locale ? { code: props.locale } : void 0,
    category: props.category ? { id: Number(props.category) } : void 0,
  } satisfies Prisma.text_templatesWhereInput;

  const [total, templates] = await Promise.all([
    prisma.text_templates.count({ where }),
    prisma.text_templates.findMany({
      skip: start,
      take: props.limit,
      where,
      select: {
        id: true,
        name: true,
        poster: {
          select: {
            mime: true,
            width: true,
            height: true,
            pathname: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        language: {
          select: {
            code: true,
            name: true,
          },
        },
      },
      orderBy: { id: "desc" },
    }),
  ]);

  const reactions = await prisma.text_template_reactions.groupBy({
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
      <TableHeader actions values={["Name", "Category", "Language", "Reaction"]} />

      {templates.length < 1 && (
        <p className="col-span-full border-t border-slate-700 px-4 py-12 text-center text-slate-400">
          Template list is empty
        </p>
      )}
      {templates.map((template) => {
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
              template.category.name,
              template.language.name,
              <Fragment key={`:reaction:template:${template.id}:`}>
                <span className="text-lime-500">{reaction.like}</span>
                {" / "}
                <span className="text-rose-500">{reaction.dislike}</span>
              </Fragment>,
              <Fragment key={`:actions:template:${template.id}:`}>
                <TemplateAnalytics template={template} />
                <UpdateTemplate template={template} />
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
