import { twMerge } from "tailwind-merge";
import RemoveCategory from "./remove";
import EditCategory from "./edit";

type CategoryRowProps = {
  category?: {
    id: number;
    name: string;
    language: {
      id: number;
      name: string;
    };
    templates: number;
  };
  languages: {
    id: number;
    name: string;
  }[];
  className?: string;
};

export default function CategoryRow(props: CategoryRowProps) {
  return (
    <div
      className={twMerge("flex items-center gap-2 border-t border-slate-700 px-4 py-2 first:border-0", props.className)}
    >
      <span className="w-32 grow">{props.category?.name || "Name"}</span>
      <span className="w-32 grow">{props.category?.language.name || "Language"}</span>
      <span className="w-32 grow">{props.category ? `${props.category.templates} Templates` : "Templates"}</span>
      <div className="flex w-16 gap-2">
        {props.category && <EditCategory category={props.category} languages={props.languages} />}
        {props.category && <RemoveCategory category={props.category} />}
      </div>
    </div>
  );
}
