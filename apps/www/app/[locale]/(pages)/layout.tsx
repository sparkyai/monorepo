import type { PropsWithChildren, ReactElement } from "react";

type LocaleLayoutProps = PropsWithChildren<{
  header: ReactElement;
  footer: ReactElement;
}>;

export default function PageLayout(props: LocaleLayoutProps) {
  return (
    <>
      {props.header}
      <div className="h-24" />
      {props.children}
      <div className="h-24 md:h-48" />
      {props.footer}
    </>
  );
}
