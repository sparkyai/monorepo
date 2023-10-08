import type { PropsWithChildren, ReactElement } from "react";

type RootLayoutProps = PropsWithChildren<{
  header: ReactElement;
}>;

export default function ContentLayout(props: RootLayoutProps) {
  return (
    <div className="flex grow flex-col">
      {props.header}
      <main className="flex grow flex-col gap-6 overflow-y-auto p-6">{props.children}</main>
    </div>
  );
}
