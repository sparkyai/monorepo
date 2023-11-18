import { notFound } from "next/navigation";
import { Suspense } from "react";
import Search from "@components/common/search";
import Skeleton from "@components/table/skeleton";
import { getSessionUser } from "@lib/utils/next-auth";
import InviteUser from "./invite";
import Table from "./table";

type GeneralUsersProps = {
  searchParams?: {
    page?: string;
    query?: string;
    locale?: string;
  };
};

export default async function GeneralUsers(props: GeneralUsersProps) {
  const locale = props.searchParams?.locale || "";
  const query = props.searchParams?.query || "";
  const limit = 20;
  const page = Number(props.searchParams?.page || "1");

  if (page < 1) {
    notFound();
  }

  const user = await getSessionUser();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Search placeholder="Search by user name or email" />
        <InviteUser />
      </div>
      <Suspense
        fallback={
          <Skeleton
            actions={1}
            className="grid-cols-[1fr_1fr_1fr_auto]"
            header={["Name", "Roles", "Language"]}
            rows={limit}
          />
        }
        key={`:${limit}:${locale}:${page}:${query}:`}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error -- - */}
        {/* @ts-ignore */}
        <Table limit={limit} locale={locale} page={page} query={query} user={user} />
      </Suspense>
    </div>
  );
}
