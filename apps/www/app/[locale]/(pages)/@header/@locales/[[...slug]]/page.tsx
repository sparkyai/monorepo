import NextLink from "next/link";
import { twMerge } from "tailwind-merge";
import { getPageData } from "lib/data/page";
import En from "app/[locale]/(pages)/@header/@locales/flag/en";
import Ru from "app/[locale]/(pages)/@header/@locales/flag/ru";
import Uk from "app/[locale]/(pages)/@header/@locales/flag/uk";
import { DropdownContent, DropdownRoot, DropdownTrigger } from "components/common/dropdown";
import { getLocaleCollection } from "lib/data/locale";

type PageHeaderLocalesProps = {
  params: {
    slug?: string[];
    locale: string;
  };
};

export default async function PageHeaderLocales(props: PageHeaderLocalesProps) {
  const [page, locales] = await Promise.all([
    getPageData(props.params.slug || [], props.params.locale),
    getLocaleCollection(),
  ]);

  return (
    <DropdownRoot>
      <DropdownTrigger
        aria-label="Language"
        className="inline-flex rounded-md border border-transparent p-3.5 transition-colors hover:bg-gray-300 focus:outline-0"
      >
        {page.locale === "en" && <En className="rounded-full" size={20} />}
        {page.locale === "ru" && <Ru className="rounded-full" size={20} />}
        {page.locale === "uk" && <Uk className="rounded-full" size={20} />}
      </DropdownTrigger>
      <DropdownContent className="-translate-x-1/2 p-3">
        <div className="flex flex-col gap-2 rounded-md bg-gray-500 p-2 shadow">
          {page.localizations.map((localization) => (
            <NextLink
              className={twMerge(
                "flex items-center gap-2 rounded-md px-3 py-2 focus:outline-0",
                page.id === localization.id ? "bg-gray-400" : "hover:bg-gray-400",
              )}
              href={localization.href}
              key={localization.id}
            >
              {localization.locale === "en" && <En className="rounded-full" size={20} />}
              {localization.locale === "ru" && <Ru className="rounded-full" size={20} />}
              {localization.locale === "uk" && <Uk className="rounded-full" size={20} />}
              <span>{locales.find((item) => item.code === localization.locale)?.name}</span>
            </NextLink>
          ))}
        </div>
      </DropdownContent>
    </DropdownRoot>
  );
}
