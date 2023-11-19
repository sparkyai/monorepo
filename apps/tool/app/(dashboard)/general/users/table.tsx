import type { Prisma } from "@prisma/client";
import { Fragment } from "react";
import TableRow from "@components/table/row";
import TableHeader from "@components/table/header";
import TablePagination from "@components/table/pagination";
import TableWrap from "@components/table/wrap";
import prisma from "@lib/utils/prisma";
import DeleteUser from "./delete";

type TableProps = {
  user: {
    id: number;
  };
  page: number;
  limit: number;
  query?: string;
  locale?: string;
};

export default async function Table(props: TableProps) {
  const start = (props.page - 1) * props.limit;
  const where = {
    OR: [
      { email: { contains: props.query, mode: "insensitive" } },
      { last_name: { contains: props.query, mode: "insensitive" } },
      { first_name: { contains: props.query, mode: "insensitive" } },
    ],
  } satisfies Prisma.usersWhereInput;

  const [total, users] = await Promise.all([
    prisma.users.count({ where }),
    prisma.users.findMany({
      skip: start,
      take: props.limit,
      where,
      select: {
        id: true,
        email: true,
        last_name: true,
        first_name: true,
        invitation: {
          select: {
            created_at: true,
          },
        },
      },
      orderBy: { id: "desc" },
    }),
  ]);

  return (
    <TableWrap className="grid-cols-[1fr_1fr_1fr_auto]">
      <TableHeader actions values={["Name", "Email", "Status"]} />

      {users.length < 1 && (
        <p className="col-span-full border-t border-slate-700 px-4 py-12 text-center text-slate-400">
          User list is empty
        </p>
      )}
      {users.map((user) => (
        <TableRow
          key={user.id}
          values={[
            [user.first_name, user.last_name].join(" "),
            user.email,
            user.invitation ? (
              <span className="font-medium text-blue-500" key={`:status:user:${user.id}:`}>
                Invited
              </span>
            ) : (
              <span className="font-medium text-lime-500" key={`:status:user:${user.id}:`}>
                Confirmed
              </span>
            ),
            <Fragment key={`:actions:user:${user.id}:`}>
              <DeleteUser user={props.user.id === user.id ? void 0 : { id: user.id }} />
            </Fragment>,
          ]}
        />
      ))}

      <TablePagination end={start + users.length} page={props.page} start={Math.min(start + 1, total)} total={total} />
    </TableWrap>
  );
}
