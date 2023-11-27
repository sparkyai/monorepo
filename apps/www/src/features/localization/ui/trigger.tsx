import { DropdownTrigger } from "components/common/dropdown";
import EnFlag from "./en-flag";
import RuFlag from "./ru-flag";
import UkFlag from "./uk-flag";

type TriggerProps = {
  label: string;
  locale: string;
};

export default function Trigger(props: TriggerProps) {
  return (
    <DropdownTrigger
      aria-label={props.label}
      className="inline-flex rounded-md border border-transparent p-3.5 transition-colors hover:bg-gray-300 focus:outline-0"
    >
      {props.locale === "en" && <EnFlag className="rounded-full" size={20} />}
      {props.locale === "ru" && <RuFlag className="rounded-full" size={20} />}
      {props.locale === "uk" && <UkFlag className="rounded-full" size={20} />}
    </DropdownTrigger>
  );
}
