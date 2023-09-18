import type { PropsWithChildren, ReactElement } from "react";

type LocaleLayoutProps = PropsWithChildren<{
  icon: ReactElement;
  header: ReactElement;
  footer: ReactElement;
}>;

export default function AuthLayout(props: LocaleLayoutProps) {
  return (
    <>
      {/*<header className="flex justify-between">*/}
      {/*  <div>left</div>*/}
      {/*  <div>right</div>*/}
      {/*</header>*/}
      <div className="m-auto w-full max-w-md p-5">
        <div className="relative flex flex-col gap-8 overflow-hidden rounded-md border border-gray-400 bg-gray-600 p-7">
          {props.icon}
          {props.header}
          {props.children}
          {props.footer}
        </div>
      </div>
      {/*<footer className="flex justify-between">*/}
      {/*  <div>left</div>*/}
      {/*  <div>right</div>*/}
      {/*</footer>*/}
    </>
  );
}
