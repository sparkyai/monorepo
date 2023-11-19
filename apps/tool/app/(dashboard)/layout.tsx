import type { PropsWithChildren, ReactElement } from "react";
import SidebarLayout from "./sidebar/layout";
import SidebarGroup from "./sidebar/group";
import SidebarLink from "./sidebar/link";

type DashboardLayoutProps = PropsWithChildren<{
  header: ReactElement;
}>;

export default async function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <>
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
        <SidebarGroup label="General">
          <SidebarLink href="/general/users">Users</SidebarLink>
          <SidebarLink href="/general/tokens">API Tokens</SidebarLink>
        </SidebarGroup>
      </SidebarLayout>
      <div className="flex grow flex-col">
        {props.header}
        <main className="flex grow flex-col gap-6 overflow-y-auto p-6">{props.children}</main>
      </div>
    </>
  );
}
