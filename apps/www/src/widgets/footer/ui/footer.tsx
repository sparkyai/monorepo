import Copyright from "./copyright";
import Payments from "./payments";
import Content from "./content";

type FooterProps = {
  locale: string;
};

export function Footer(props: FooterProps) {
  return (
    <>
      <div aria-hidden className="h-24 md:h-48" />
      <footer className="mt-auto bg-gray-900">
        <div className="border-y border-gray-400 py-20">
          <Content locale={props.locale} />
        </div>
        <div className="container flex flex-col items-center gap-5 py-5 sm:flex-row-reverse">
          <Payments />
          <Copyright locale={props.locale} />
        </div>
      </footer>
    </>
  );
}
