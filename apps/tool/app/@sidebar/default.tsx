import SidebarLayout from "./layout";
import SidebarGroup from "./group";
import SidebarLink from "./link";

export default function DefaultSidebar() {
  return (
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
    </SidebarLayout>
  );
}
