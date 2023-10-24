"use client";

import type { PropsWithChildren } from "react";
import Loader from "@components/common/loader";

export function TableRow(props: PropsWithChildren) {
  return (
    <div className="flex items-center gap-2 border-t border-slate-700 px-4 py-2 text-sm first:border-0">
      {props.children}
    </div>
  );
}

export function TableHeader(props: PropsWithChildren) {
  return <div className="flex items-center gap-2 px-4 py-2 font-bold">{props.children}</div>;
}

type TableProps = PropsWithChildren<{
  isLoading?: boolean;
}>;

export default function Table(props: TableProps) {
  return (
    <div className="flex flex-col rounded-md border border-slate-700 bg-slate-800 tracking-wider">
      {props.children}
      {props.isLoading && (
        <div className="fixed inset-0 z-50 flex bg-slate-950/75">
          <Loader className="m-auto" />
        </div>
      )}
    </div>
  );
}

Table.Row = TableRow;
Table.Header = TableHeader;
