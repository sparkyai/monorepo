import { twMerge } from "tailwind-merge";
import NextLink from "next/link";
import Edit from "@components/icon/edit";
import RemoveRole from "./remove";

type RoleRowProps = {
  role?: {
    id: number;
    name: string;
    language: {
      name: string;
    };
  };
  className?: string;
};

export default function RoleRow(props: RoleRowProps) {
  return (
    <div
      className={twMerge("flex items-center gap-2 border-t border-slate-700 px-4 py-2 first:border-0", props.className)}
    >
      <span className="w-32 grow">{props.role?.name || "Name"}</span>
      <span className="w-32 grow">{props.role?.language.name || "Language"}</span>
      <div className="flex w-16 gap-2">
        {props.role && (
          <NextLink
            className="p-1.5 transition-colors hover:text-blue-400 active:text-blue-400"
            href={`/roles/${props.role.id}`}
          >
            <Edit size={16} />
          </NextLink>
        )}
        {props.role && <RemoveRole role={props.role} />}
      </div>
    </div>
  );
}
