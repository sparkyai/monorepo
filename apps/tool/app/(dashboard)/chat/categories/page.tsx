import { Suspense } from "react";
import { notFound } from "next/navigation";
import Search from "@components/common/search";
import Language from "@components/common/language";
import Skeleton from "@components/table/skeleton";
import { getLanguageCollection } from "@lib/data/language";
import CreateCategory from "./create";
import Table from "./table";

type ChatCategoriesProps = {
  searchParams?: {
    page?: string;
    query?: string;
    locale?: string;
  };
};

export default async function ChatCategories(props: ChatCategoriesProps) {
  const locale = props.searchParams?.locale || "";
  const query = props.searchParams?.query || "";
  const limit = 20;
  const page = Number(props.searchParams?.page || "1");

  if (page < 1) {
    notFound();
  }

  const languages = await getLanguageCollection();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Search placeholder="Search by category name" />
        <Language languages={languages} />
        <CreateCategory languages={languages} />
      </div>
      <Suspense
        fallback={
          <Skeleton
            actions={3}
            className="grid-cols-[2fr_1fr_1fr_auto]"
            header={["Name", "Roles", "Language"]}
            rows={limit}
          />
        }
        key={`:${limit}:${locale}:${page}:${query}:`}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error -- - */}
        {/* @ts-ignore */}
        <Table limit={limit} locale={locale} page={page} query={query} />
      </Suspense>
    </div>
  );
}
