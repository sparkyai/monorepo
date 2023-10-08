import type { PropsWithChildren, ReactElement } from "react";
import NextLink from "next/link";
import Brand from "components/common/brand";
import { DropdownRoot, DropdownTrigger } from "components/common/dropdown";
import ButtonBlueFilled from "components/button/button-blue-filled";
import { getDonationLinkData } from "lib/data/donation-link";

type HeaderLayoutProps = PropsWithChildren<{
  params: {
    locale: string;
  };
  locales: ReactElement;
}>;

export default async function HeaderLayout(props: HeaderLayoutProps) {
  const roadmap = await getDonationLinkData(props.params.locale);

  return (
    <DropdownRoot>
      <header className="text-blue-25 fixed inset-x-0 top-0 z-30 bg-gray-900/75 shadow backdrop-blur">
        <div className="container flex justify-between gap-5 py-5">
          <Brand locale={props.params.locale} />
          {props.children}
          <div className="flex items-start gap-2.5">
            {props.locales}
            {roadmap && (
              <ButtonBlueFilled
                className="hidden sm:inline-flex"
                component={NextLink}
                href={`/${roadmap.page.locale}${roadmap.page.slug ? `/${roadmap.page.slug}` : ""}`}
              >
                {roadmap.label}
              </ButtonBlueFilled>
            )}
            <DropdownTrigger
              aria-label="Menu"
              className="relative h-12 w-12 cursor-pointer rounded-sm border border-transparent bg-transparent text-lg font-semibold leading-5 transition-colors hover:border-gray-300 hover:bg-gray-300 active:border-gray-300 active:bg-gray-300 lg:hidden first:[&_span]:aria-expanded:mt-0 first:[&_span]:aria-expanded:rotate-45 last:[&_span]:aria-expanded:mt-0 last:[&_span]:aria-expanded:-rotate-45 even:[&_span]:aria-expanded:opacity-0"
            >
              <span className="absolute left-1/2 top-1/2 -mt-2 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-y border-blue-50 transition-all duration-500" />
              <span className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-y border-blue-50 transition-opacity duration-500" />
              <span className="absolute left-1/2 top-1/2 mt-2 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-y border-blue-50 transition-all duration-500" />
            </DropdownTrigger>
          </div>
        </div>
      </header>
    </DropdownRoot>
  );
}
