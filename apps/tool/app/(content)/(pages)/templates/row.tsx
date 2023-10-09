"use client";

import { twMerge } from "tailwind-merge";
import NextLink from "next/link";
import Edit from "@components/icon/edit";
import RemoveTemplate from "./remove";

type TemplateRowProps = {
  template?: {
    id: number;
    name: string;
    category: {
      name: string;
    };
    language: {
      name: string;
    };
  };
  className?: string;
};

export default function TemplateRow(props: TemplateRowProps) {
  return (
    <div
      className={twMerge("flex items-center gap-2 border-t border-slate-700 px-4 py-2 first:border-0", props.className)}
    >
      <span className="w-32 grow">{props.template?.name || "Name"}</span>
      <span className="w-32 grow">{props.template?.category.name || "Category"}</span>
      <span className="w-32 grow">{props.template?.language.name || "Language"}</span>
      <div className="flex w-16 gap-2">
        {props.template && (
          <NextLink
            className="p-1.5 transition-colors hover:text-blue-400 active:text-blue-400"
            href={`/templates/${props.template.id}`}
          >
            <Edit size={16} />
          </NextLink>
        )}
        {props.template && <RemoveTemplate template={props.template} />}
      </div>
    </div>
  );
}
