import type { Prisma } from "@prisma/client";
import TableRow from "@components/table/row";
import TableHeader from "@components/table/header";
import TablePagination from "@components/table/pagination";
import TableWrap from "@components/table/wrap";
import prisma from "@lib/utils/prisma";
import dayjs from "@lib/utils/dayjs";

type PaymentTableProps = {
  user: {
    id: number;
  };
};

export default async function PaymentTable(props: PaymentTableProps) {
  const where = {
    user: { id: props.user.id },
  } satisfies Prisma.paymentsWhereInput;

  const [total, payments] = await Promise.all([
    prisma.payments.count({ where }),
    prisma.payments.findMany({
      take: 20,
      where,
      select: {
        id: true,
        amount: true,
        tokens: true,
        method: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: { created_at: "desc" },
    }),
  ]);

  return (
    <TableWrap className="grid-cols-[5fr_4fr_4fr_4fr_7fr_7fr]">
      <TableHeader values={["Method", "Amount", "Tokens", "Status", "Created", "Updated"]} />

      {payments.length < 1 && (
        <p className="col-span-full border-t border-slate-700 px-4 py-12 text-center text-slate-400">
          Payment list is empty
        </p>
      )}
      {payments.map((payment) => {
        let className: string | undefined;

        if (payment.status === "success") {
          className = "text-lime-500";
        } else if (["failure", "expired"].includes(payment.status)) {
          className = "text-rose-500";
        } else {
          className = "text-yellow-500";
        }

        return (
          <TableRow
            key={Number(payment.id)}
            values={[
              payment.method,
              payment.amount.toString(),
              payment.tokens.toString(),
              <span className={className} key={`:payment:status:${payment.id}:`}>
                {payment.status}
              </span>,
              dayjs(payment.created_at).format("DD/MM/YYYY HH:mm"),
              dayjs(payment.updated_at).format("DD/MM/YYYY HH:mm"),
            ]}
          />
        );
      })}

      <TablePagination disabled end={Math.min(20, total)} page={1} start={Math.min(1, total)} total={total} />
    </TableWrap>
  );
}
