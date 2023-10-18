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
        <SidebarLink href="/roles">Roles</SidebarLink>
      </SidebarGroup>
      <SidebarGroup label="Text">
        <SidebarLink href="/templates">Templates</SidebarLink>
        <SidebarLink href="/categories">Categories</SidebarLink>
      </SidebarGroup>
      <SidebarGroup label="Image">
        <SidebarLink href="/image/templates">Templates</SidebarLink>
      </SidebarGroup>
    </SidebarLayout>
  );
}
