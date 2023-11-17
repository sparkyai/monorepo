import { Suspense } from "react";
import { notFound } from "next/navigation";
import Search from "@components/common/search";
import Language from "@components/common/language";
import { getLanguageCollection } from "@lib/data/language";
import Skeleton from "@components/table/skeleton";
import { getLeonardoModelCollection } from "@lib/leonardo/model";
import CreateTemplate from "./create";
import Provider from "./provider";
import Table from "./table";

type ImageTemplatesProps = {
  searchParams?: {
    page?: string;
    query?: string;
    locale?: string;
    provider?: string;
  };
};

export default async function ImageTemplates(props: ImageTemplatesProps) {
  const provider = props.searchParams?.provider || "";
  const locale = props.searchParams?.locale || "";
  const query = props.searchParams?.query || "";
  const limit = 20;
  const page = Number(props.searchParams?.page || "1");

  if (page < 1) {
    notFound();
  }

  const [leonardo, languages] = await Promise.all([getLeonardoModelCollection(), getLanguageCollection()]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Search placeholder="Search by template name" />
        <Provider providers={["DALL·E", "Leonardo"]} />
        <Language languages={languages} />
        <CreateTemplate languages={languages} leonardo={leonardo} />
      </div>
      <Suspense
        fallback={
          <Skeleton
            actions={3}
            className="grid-cols-[2fr_1fr_1fr_1fr_auto]"
            header={["Name", "Provider", "Language", "Reaction"]}
            rows={10}
          />
        }
        key={`:${provider}:${limit}:${locale}:${page}:${query}:`}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error -- - */}
        {/* @ts-ignore */}
        <Table limit={limit} locale={locale} page={page} provider={provider} query={query} />
      </Suspense>
    </div>
  );
}
