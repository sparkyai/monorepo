import { twMerge } from "tailwind-merge";
import TableRow from "./row";

type TableHeaderProps = {
  values: string[];
  actions?: boolean;
  className?: string;
};

export default function TableHeader(props: TableHeaderProps) {
  const values = [...props.values];

  if (props.actions) {
    values.push("");
  }

  return <TableRow className={twMerge("border-none font-bold", props.className)} values={values} />;
}
