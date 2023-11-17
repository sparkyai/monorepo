import type { Prisma } from "@prisma/client";
import TableRow from "@components/table/row";
import TableHeader from "@components/table/header";
import TablePagination from "@components/table/pagination";
import TableWrap from "@components/table/wrap";
import prisma from "@lib/utils/prisma";

type ReferralTableProps = {
  user: {
    id: number;
  };
};

export default async function ReferralTable(props: ReferralTableProps) {
  const where = {
    referrer: { id: { equals: props.user.id } },
  } satisfies Prisma.telegram_usersWhereInput;

  const [total, users] = await Promise.all([
    prisma.telegram_users.count({ where }),
    prisma.telegram_users.findMany({
      take: 20,
      where,
      select: {
        id: true,
        language: {
          select: {
            code: true,
            name: true,
          },
        },
        last_name: true,
        first_name: true,
      },
      orderBy: { id: "desc" },
    }),
  ]);

  return (
    <TableWrap className="grid-cols-[1fr_2fr_1fr]">
      <TableHeader values={["ID", "Name", "Language"]} />

      {users.length < 1 && (
        <p className="col-span-full border-t border-slate-700 px-4 py-12 text-center text-slate-400">
          Referral list is empty
        </p>
      )}
      {users.map((user) => (
        <TableRow
          key={Number(user.id)}
          values={[
            user.id.toString(),
            [user.first_name, user.last_name].filter(Boolean).join(" "),
            user.language?.name || "",
          ]}
        />
      ))}

      <TablePagination disabled end={Math.min(20, total)} page={1} start={Math.min(1, total)} total={total} />
    </TableWrap>
  );
}
