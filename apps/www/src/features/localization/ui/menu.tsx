import NextLink from "next/link";
import { twMerge } from "tailwind-merge";
import { fetchPageBySlug } from "entities/page";
import { fetchAllLanguages } from "entities/language";
import EnFlag from "./en-flag";
import RuFlag from "./ru-flag";
import UkFlag from "./uk-flag";

type LocalizationMenuProps = {
  path: string[];
  locale: string;
};

export default async function Menu(props: LocalizationMenuProps) {
  const [page, languages] = await Promise.all([fetchPageBySlug(props.locale, ...props.path), fetchAllLanguages()]);

  if (page.localizations.length < 1) {
    return null;
  }

  return (
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
          {localization.locale === "en" && <EnFlag className="rounded-full" size={20} />}
          {localization.locale === "ru" && <RuFlag className="rounded-full" size={20} />}
          {localization.locale === "uk" && <UkFlag className="rounded-full" size={20} />}
          <span>{languages.find((language) => language.code === localization.locale)?.name}</span>
        </NextLink>
      ))}
    </div>
  );
}
