import type { Prisma } from "@prisma/client";
import { Fragment, Suspense } from "react";
import TableRow from "@components/table/row";
import TableHeader from "@components/table/header";
import TablePagination from "@components/table/pagination";
import TableWrap from "@components/table/wrap";
import prisma from "@lib/utils/prisma";
import { getUserTokenBalance } from "@lib/data/telegram/user";
import Skeleton from "@components/table/skeleton";
import UserTopUp from "@app/(dashboard)/telegram/users/top-up";
import UserAnalytics from "./analytics";
import UserReferrals from "./referrals";
import ReferralTable from "./referral-table";
import UserPayments from "./payments";
import PaymentTable from "./payment-table";

type UserTableProps = {
  page: number;
  limit: number;
  query?: string;
  locale?: string;
};

export default async function UserTable(props: UserTableProps) {
  const start = (props.page - 1) * props.limit;
  const where = {
    AND: [
      {
        OR: props.query
          ? [
              { last_name: { contains: props.query, mode: "insensitive" } },
              { first_name: { contains: props.query, mode: "insensitive" } },
            ]
          : [],
      },
      {
        language: props.locale ? { code: props.locale } : void 0,
      },
    ],
  } satisfies Prisma.telegram_usersWhereInput;

  const [total, users] = await Promise.all([
    prisma.telegram_users.count({ where }),
    prisma.telegram_users.findMany({
      skip: start,
      take: props.limit,
      where,
      select: {
        id: true,
        _count: {
          select: {
            referrals: true,
          },
        },
        language: {
          select: {
            code: true,
            name: true,
          },
        },
        last_name: true,
        first_name: true,
        extra_tokens: true,
      },
      orderBy: { id: "desc" },
    }),
  ]);

  const tokens = await Promise.all(
    users.map(async (user) => {
      return { id: user.id, tokens: await getUserTokenBalance(user.id), extra: user.extra_tokens };
    }),
  );

  return (
    <TableWrap className="grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]">
      <TableHeader actions values={["ID", "Name", "Tokens", "Referrals", "Language"]} />

      {users.length < 1 && (
        <p className="col-span-full border-t border-slate-700 px-4 py-12 text-center text-slate-400">
          User list is empty
        </p>
      )}
      {users.map((user) => {
        const balance = tokens.find((item) => item.id === user.id);

        return (
          <TableRow
            key={Number(user.id)}
            values={[
              user.id.toString(),
              [user.first_name, user.last_name].filter(Boolean).join(" "),
              <Fragment key={`:balance:user:${user.id}:`}>
                <span className="text-lime-500">{balance?.tokens || 0}</span>
                {" / "}
                <span className="text-rose-500">{balance?.extra || 0}</span>
              </Fragment>,
              user._count.referrals.toString(),
              user.language?.name || "",
              <Fragment key={`:actions:user:${user.id}:`}>
                <UserAnalytics user={user} />
                <UserReferrals>
                  <Suspense
                    fallback={
                      <Skeleton className="grid-cols-[1fr_2fr_1fr]" header={["ID", "Name", "Language"]} rows={20} />
                    }
                  >
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error -- - */}
                    {/* @ts-ignore */}
                    <ReferralTable user={user} />
                  </Suspense>
                </UserReferrals>
                <UserPayments>
                  <Suspense
                    fallback={
                      <Skeleton
                        className="grid-cols-[1fr_1fr_1fr_1fr]"
                        header={["Method", "Amount", "Tokens", "Status"]}
                        rows={20}
                      />
                    }
                  >
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error -- - */}
                    {/* @ts-ignore */}
                    <PaymentTable user={user} />
                  </Suspense>
                </UserPayments>
                <UserTopUp user={user} />
              </Fragment>,
            ]}
          />
        );
      })}

      <TablePagination end={start + users.length} page={props.page} start={Math.min(start + 1, total)} total={total} />
    </TableWrap>
  );
}
