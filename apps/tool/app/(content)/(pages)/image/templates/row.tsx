import { twMerge } from "tailwind-merge";
import Delete from "./delete";
import Edit from "./edit";

type RowProps = {
  leonardo?: {
    id: string;
    name: string;
  }[];
  template?: {
    id: number;
    name: string;
    model: null | string;
    provider: string;
    language: {
      id: number;
      name: string;
    };
  };
  languages?: {
    id: number;
    name: string;
  }[];
  className?: string;
};

export default function Row(props: RowProps) {
  return (
    <div
      className={twMerge("flex items-center gap-2 border-t border-slate-700 px-4 py-2 first:border-0", props.className)}
    >
      <span className="w-32 grow truncate">{props.template?.name || "Name"}</span>
      <span className="w-24 grow truncate">{props.template?.language.name || "Language"}</span>
      <span className="w-24 grow truncate">{props.template?.provider || "Provider"}</span>
      <div className="flex w-16 gap-2">
        {props.template && props.languages && props.leonardo && (
          <Edit languages={props.languages} leonardo={props.leonardo} template={props.template} />
        )}
        {props.template && <Delete template={props.template} />}
      </div>
    </div>
  );
}
