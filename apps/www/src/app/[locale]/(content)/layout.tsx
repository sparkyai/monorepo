import type { PropsWithChildren, ReactElement } from "react";
import { Footer } from "widgets/footer";

type ContentLayoutProps = PropsWithChildren<{
  params: {
    locale: string;
  };
  navbar: ReactElement;
}>;

export default function ContentLayout(props: ContentLayoutProps) {
  return (
    <>
      {props.navbar}
      {props.children}
      <Footer locale={props.params.locale} />
    </>
  );
}
