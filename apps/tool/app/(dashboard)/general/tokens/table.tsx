import type { Prisma } from "@prisma/client";
import { Fragment } from "react";
import TableRow from "@components/table/row";
import TableHeader from "@components/table/header";
import TablePagination from "@components/table/pagination";
import TableWrap from "@components/table/wrap";
import prisma from "@lib/utils/prisma";
import dayjs from "@lib/utils/dayjs";
import DeleteToken from "./delete";
import CopyToken from "./copy";

type TableProps = {
  page: number;
  limit: number;
  query?: string;
};

export default async function Table(props: TableProps) {
  const start = (props.page - 1) * props.limit;
  const where = {
    name: props.query ? { contains: props.query, mode: "insensitive" } : void 0,
  } satisfies Prisma.tokensWhereInput;

  const [total, tokens] = await Promise.all([
    prisma.tokens.count({ where }),
    prisma.tokens.findMany({
      skip: start,
      take: props.limit,
      where,
      orderBy: { created_at: "desc" },
    }),
  ]);

  return (
    <TableWrap className="grid-cols-[1fr_1fr_1fr_auto]">
      <TableHeader actions values={["Name", "Key", "Created"]} />

      {tokens.length < 1 && (
        <p className="col-span-full border-t border-slate-700 px-4 py-12 text-center text-slate-400">
          Token list is empty
        </p>
      )}
      {tokens.map((token) => (
        <TableRow
          key={token.key}
          values={[
            token.name,
            `${token.key.slice(0, 3)}${"".padEnd(8, "*")}${token.key.slice(-3)}`,
            dayjs.duration(dayjs(token.created_at).diff(), "milliseconds").humanize(true),
            <Fragment key={`:actions:token:${token.key}:`}>
              <CopyToken token={token} />
              <DeleteToken token={token} />
            </Fragment>,
          ]}
        />
      ))}

      <TablePagination end={start + tokens.length} page={props.page} start={Math.min(start + 1, total)} total={total} />
    </TableWrap>
  );
}
