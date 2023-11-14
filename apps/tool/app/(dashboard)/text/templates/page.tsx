import { Suspense } from "react";
import { notFound } from "next/navigation";
import Search from "@components/common/search";
import Language from "@components/common/language";
import Skeleton from "@components/table/skeleton";
import { getLanguageCollection } from "@lib/data/language";
import prisma from "@lib/utils/prisma";
import CreateTemplate from "./create";
import Category from "./category";
import Table from "./table";

type TextTemplatesProps = {
  searchParams?: {
    page?: string;
    query?: string;
    locale?: string;
    category?: string;
  };
};

export default async function TextTemplates(props: TextTemplatesProps) {
  const category = props.searchParams?.category || "";
  const locale = props.searchParams?.locale || "";
  const query = props.searchParams?.query || "";
  const limit = 10;
  const page = Number(props.searchParams?.page || "1");

  if (page < 1) {
    notFound();
  }

  const [categories, languages] = await Promise.all([
    prisma.text_categories.findMany({
      where: {
        language: locale ? { code: locale } : void 0,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: { id: "desc" },
    }),
    getLanguageCollection(),
  ]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Search placeholder="Search by template name" />
        <Category categories={categories} />
        <Language languages={languages} />
        <CreateTemplate categories={categories} languages={languages} />
      </div>
      <Suspense
        fallback={
          <Skeleton
            actions={3}
            className="grid-cols-[2fr_1fr_1fr_1fr_auto]"
            header={["Name", "Category", "Language", "Reaction"]}
            rows={10}
          />
        }
        key={`:${category}:${limit}:${locale}:${page}:${query}:`}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error -- - */}
        {/* @ts-ignore */}
        <Table category={category} limit={limit} locale={locale} page={page} query={query} />
      </Suspense>
    </div>
  );
}
