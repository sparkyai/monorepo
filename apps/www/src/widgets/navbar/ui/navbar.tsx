import type { PropsWithChildren } from "react";
import Brand from "shared/ui/brand";

type NavbarProps = PropsWithChildren<{
  locale: string;
}>;

export function Navbar(props: NavbarProps) {
  return (
    <>
      <header className="text-blue-25 fixed inset-x-0 top-0 z-30 bg-gray-900/75 shadow backdrop-blur">
        <div className="container flex justify-between gap-5 py-5">
          <Brand key={props.locale} locale={props.locale} />
          {props.children}
        </div>
      </header>
      <div aria-hidden className="h-[5.625rem]" />
    </>
  );
}
