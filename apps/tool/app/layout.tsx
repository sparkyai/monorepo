import "./common.css";
import { Roboto } from "next/font/google";
import type { PropsWithChildren, ReactElement } from "react";
import type { Metadata } from "next";
import SidebarLayout from "@app/sidebar/layout";
import SidebarGroup from "@app/sidebar/group";
import SidebarLink from "@app/sidebar/link";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

type RootLayoutProps = PropsWithChildren<{
  header: ReactElement;
}>;

export default async function RootLayout(props: RootLayoutProps) {
  return (
    <html className={roboto.className} lang="en">
      <body className="flex bg-slate-900 text-slate-50">
        <SidebarLayout>
          <SidebarGroup>
            <SidebarLink href="/">Dashboard</SidebarLink>
          </SidebarGroup>
          <SidebarGroup label="Chat">
            <SidebarLink href="/chat/roles">Roles</SidebarLink>
            <SidebarLink href="/chat/categories">Categories</SidebarLink>
          </SidebarGroup>
          <SidebarGroup label="Text">
            <SidebarLink href="/text/templates">Templates</SidebarLink>
            <SidebarLink href="/text/categories">Categories</SidebarLink>
          </SidebarGroup>
          <SidebarGroup label="Image">
            <SidebarLink href="/image/templates">Templates</SidebarLink>
          </SidebarGroup>
          <SidebarGroup label="Telegram">
            <SidebarLink href="/telegram/users">Users</SidebarLink>
          </SidebarGroup>
        </SidebarLayout>
        <div className="flex grow flex-col">
          {props.header}
          <main className="flex grow flex-col gap-6 overflow-y-auto p-6">{props.children}</main>
        </div>
      </body>
    </html>
  );
}
