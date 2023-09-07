import type { PropsWithChildren, ReactElement } from "react";
import { PreviewProvider } from "@app/templates/[id]/preview";

type TemplateLayoutProps = PropsWithChildren<{
  navbar: ReactElement;
  sidebar: ReactElement;
}>;

export default function TemplateLayout(props: TemplateLayoutProps) {
  return (
    <PreviewProvider>
      <div className="flex w-0 grow flex-col">
        {props.navbar}
        {props.children}
      </div>
      {props.sidebar}
    </PreviewProvider>
  );
}
