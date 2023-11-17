import type { Prisma } from "@prisma/client";
import TableRow from "@components/table/row";
import TableHeader from "@components/table/header";
import TablePagination from "@components/table/pagination";
import TableWrap from "@components/table/wrap";
import prisma from "@lib/utils/prisma";

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
      },
      orderBy: { id: "desc" },
    }),
  ]);

  return (
    <TableWrap className="grid-cols-[1fr_1fr_1fr_1fr]">
      <TableHeader values={["Method", "Amount", "Tokens", "Status"]} />

      {payments.length < 1 && (
        <p className="col-span-full border-t border-slate-700 px-4 py-12 text-center text-slate-400">
          Payment list is empty
        </p>
      )}
      {payments.map((payment) => (
        <TableRow
          key={Number(payment.id)}
          values={[payment.method, payment.amount.toString(), payment.tokens.toString(), payment.status]}
        />
      ))}

      <TablePagination disabled end={Math.min(20, total)} page={1} start={Math.min(1, total)} total={total} />
    </TableWrap>
  );
}
