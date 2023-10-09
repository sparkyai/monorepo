import type { PropsWithChildren, ReactElement } from "react";
import { PreviewProvider } from "./preview";

type TemplateLayoutProps = PropsWithChildren<{
  sidebar: ReactElement;
}>;

export default function TemplateLayout(props: TemplateLayoutProps) {
  return (
    <PreviewProvider>
      <div className="-m-6 flex grow overflow-hidden border-t border-slate-700">
        {props.children}
        {props.sidebar}
      </div>
    </PreviewProvider>
  );
}
