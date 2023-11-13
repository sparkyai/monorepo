import { Fragment } from "react";
import type { Prisma } from "@prisma/client";
import TableHeader from "@components/table/header";
import TableRow from "@components/table/row";
import TablePagination from "@components/table/pagination";
import TableWrap from "@components/table/wrap";
import prisma from "@lib/utils/prisma";
import RoleAnalytics from "./analytics";
import DeleteRole from "./delete";
import UpdateRole from "./update";

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
  } satisfies Prisma.chat_rolesWhereInput;

  const [total, roles] = await Promise.all([
    prisma.chat_roles.count({ where }),
    prisma.chat_roles.findMany({
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

  const reactions = await prisma.chat_role_reactions.groupBy({
    by: ["type", "role_id"],
    where: {
      role: {
        id: { in: roles.map((role) => role.id) },
      },
    },
    _count: true,
  });

  return (
    <TableWrap className="grid-cols-[2fr_1fr_1fr_1fr_auto]">
      <TableHeader actions values={["Name", "Category", "Language", "Reaction"]} />

      {roles.length < 1 && (
        <p className="col-span-full border-t border-slate-700 px-4 py-12 text-center text-slate-400">
          Role list is empty
        </p>
      )}
      {roles.map((role) => {
        const reaction = {
          like: 0,
          dislike: 0,
        };

        for (const item of reactions) {
          if (item.role_id === role.id) {
            reaction[item.type] = item._count;
          }
        }

        return (
          <TableRow
            key={role.id}
            values={[
              role.name,
              role.category.name,
              role.language.name,
              <Fragment key={`:reaction:role:${role.id}:`}>
                <span className="text-lime-500">{reaction.like}</span>
                {" / "}
                <span className="text-rose-500">{reaction.dislike}</span>
              </Fragment>,
              <Fragment key={`:actions:role:${role.id}:`}>
                <RoleAnalytics role={role} />
                <UpdateRole role={role} />
                <DeleteRole role={role} />
              </Fragment>,
            ]}
          />
        );
      })}

      <TablePagination end={start + roles.length} page={props.page} start={Math.min(start + 1, total)} total={total} />
    </TableWrap>
  );
}
