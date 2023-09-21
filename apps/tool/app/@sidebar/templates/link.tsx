"use client";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { deleteTemplate } from "@lib/actions/template";
import Remove from "@components/icon/remove";

type TemplateLinkProps = {
  id: number;
  name: string;
};

export default function TemplateLink(props: TemplateLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={twMerge(
        "group relative flex w-72 cursor-pointer flex-col justify-between rounded-lg border-4 border-stone-600 bg-stone-600 px-4 py-2 transition-colors",
        pathname === `/templates/${props.id}`
          ? "border-blue-800 bg-blue-800"
          : "hover:border-blue-700 hover:bg-blue-700 active:border-blue-700 active:bg-blue-700",
      )}
    >
      <div className="flex gap-2">
        <NextLink
          className="grow truncate text-xl font-medium before:absolute before:inset-0"
          href={`/templates/${props.id}`}
        >
          {props.name}
        </NextLink>
        <div className="z-10 flex opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100">
          <button
            className="rounded-full transition-colors hover:text-red-500 active:text-red-500"
            onClick={() =>
              void deleteTemplate(props.id).then(() => {
                if (pathname === `/templates/${props.id}`) {
                  router.replace("/templates");
                } else {
                  router.refresh();
                }
              })
            }
            type="button"
          >
            <Remove size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
