import { Suspense } from "react";
import { DropdownContent, DropdownRoot, DropdownTrigger } from "shared/ui/dropdown";
import EnFlag from "./en-flag";
import RuFlag from "./ru-flag";
import UkFlag from "./uk-flag";
import Menu from "./menu";

type LocalizationMenuProps = {
  path: string[];
  locale: string;
};

export function LocalizationDropdown(props: LocalizationMenuProps) {
  return (
    <DropdownRoot>
      <DropdownTrigger
        aria-label="Language"
        className="inline-flex rounded-md border border-transparent p-3.5 transition-colors hover:bg-gray-300 focus:outline-0"
      >
        {props.locale === "en" && <EnFlag className="rounded-full" size={20} />}
        {props.locale === "ru" && <RuFlag className="rounded-full" size={20} />}
        {props.locale === "uk" && <UkFlag className="rounded-full" size={20} />}
      </DropdownTrigger>
      <DropdownContent className="-translate-x-3/4 p-3">
        <Suspense key={Object.prototype.toString.call(props)}>
          <Menu locale={props.locale} path={props.path} />
        </Suspense>
      </DropdownContent>
    </DropdownRoot>
  );
}
