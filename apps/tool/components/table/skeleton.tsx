import { twMerge } from "tailwind-merge";
import ChevronLeft from "@components/icon/chevron-left";
import ChevronRight from "@components/icon/chevron-right";
import IconButton from "@components/button/icon-button";
import TableHeader from "./header";
import TableRow from "./row";

type SkeletonProps = {
  rows: number;
  header: string[];
  actions?: number;
  className?: string;
};

export default function Skeleton(props: SkeletonProps) {
  const rows = Array.from(Array(props.rows)).map((_, i) => ({ id: i }));

  const columns = props.header.map((name) => (
    <div className="h-5 w-full animate-pulse rounded bg-slate-700" key={name} />
  ));

  if (typeof props.actions === "number" && props.actions > 0) {
    columns.push(
      <div
        className="h-5 animate-pulse rounded bg-slate-700"
        key={props.header.length}
        style={{ width: 28 * props.actions + 8 * (props.actions - 1) }}
      />,
    );
  }

  return (
    <div className={twMerge(props.className, "grid rounded-md border border-slate-700 bg-slate-800 tracking-wider")}>
      <TableHeader actions={typeof props.actions === "number" && props.actions > 0} values={props.header} />

      {rows.map((row) => (
        <TableRow key={row.id} values={columns} />
      ))}

      <div className="col-span-full flex justify-end gap-2 border-t border-slate-700 px-4 py-2 text-sm">
        <div className="px-2 py-1">
          <div className="h-5 w-24 animate-pulse rounded bg-slate-700" />
        </div>
        <IconButton disabled>
          <ChevronLeft size={16} />
        </IconButton>
        <IconButton disabled>
          <ChevronRight size={16} />
        </IconButton>
      </div>
    </div>
  );
}
