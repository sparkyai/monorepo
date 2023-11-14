"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ChevronLeft from "@components/icon/chevron-left";
import ChevronRight from "@components/icon/chevron-right";
import IconButton from "@components/button/icon-button";

type TablePaginationProps = {
  end: number;
  page: number;
  total: number;
  start: number;
};

export default function TablePagination(props: TablePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="col-span-full flex items-start justify-end gap-2 border-t border-slate-700 px-4 py-2 text-sm">
      <span className="px-2 py-1 text-sm leading-5">{`${props.start} - ${props.end} of ${props.total}`}</span>
      <IconButton disabled={props.page < 2} onClick={handler(props.page - 1)}>
        <ChevronLeft size={16} />
      </IconButton>
      <IconButton disabled={props.end === props.total} onClick={handler(props.page + 1)}>
        <ChevronRight size={16} />
      </IconButton>
    </div>
  );

  function handler(page: number) {
    return function update() {
      const params = new URLSearchParams(searchParams);

      if (page < 2) {
        params.delete("page");
      } else {
        params.set("page", page.toString());
      }

      router.push(`${pathname}?${params.toString()}`);
    };
  }
}
