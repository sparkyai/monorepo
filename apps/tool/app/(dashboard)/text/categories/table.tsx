import { Fragment } from "react";
import type { Prisma } from "@prisma/client";
import TableHeader from "@components/table/header";
import TableRow from "@components/table/row";
import TablePagination from "@components/table/pagination";
import TableWrap from "@components/table/wrap";
import prisma from "@lib/utils/prisma";
import { getLanguageCollection } from "@lib/data/language";
import CategoryAnalytics from "./analytics";
import UpdateCategory from "./update";
import DeleteCategory from "./delete";

type TableProps = {
  page: number;
  limit: number;
  query?: string;
  locale?: string;
};

export default async function Table(props: TableProps) {
  const start = (props.page - 1) * props.limit;
  const where = {
    name: props.query ? { contains: props.query, mode: "insensitive" } : void 0,
    language: props.locale ? { code: props.locale } : void 0,
  } satisfies Prisma.text_categoriesWhereInput;

  const [total, categories, languages] = await Promise.all([
    prisma.text_categories.count({ where }),
    prisma.text_categories.findMany({
      skip: start,
      take: props.limit,
      where,
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            templates: true,
          },
        },
        language: true,
      },
      orderBy: { id: "desc" },
    }),
    getLanguageCollection(),
  ]);

  return (
    <TableWrap className="grid-cols-[2fr_1fr_1fr_auto]">
      <TableHeader actions values={["Name", "Templates", "Language"]} />

      {categories.length < 1 && (
        <p className="col-span-full border-t border-slate-700 px-4 py-12 text-center text-slate-400">
          Category list is empty
        </p>
      )}
      {categories.map((category) => (
        <TableRow
          key={category.id}
          values={[
            category.name,
            category._count.templates.toString(),
            category.language.name,
            <Fragment key={`:actions:category:${category.id}:`}>
              <CategoryAnalytics category={category} />
              <UpdateCategory category={category} languages={languages} />
              <DeleteCategory category={category} />
            </Fragment>,
          ]}
        />
      ))}

      <TablePagination
        end={start + categories.length}
        page={props.page}
        start={Math.min(start + 1, total)}
        total={total}
      />
    </TableWrap>
  );
}
