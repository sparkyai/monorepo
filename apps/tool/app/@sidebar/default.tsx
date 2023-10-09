import SidebarLayout from "@app/@sidebar/layout";
import SidebarGroup from "@app/@sidebar/group";
import SidebarLink from "@app/@sidebar/link";

export default function DefaultSidebar() {
  return (
    <SidebarLayout>
      <SidebarGroup>
        <SidebarLink href="/">Dashboard</SidebarLink>
      </SidebarGroup>
      <SidebarGroup label="People">
        <SidebarLink href="#">Users</SidebarLink>
        <SidebarLink href="#">Referrals</SidebarLink>
      </SidebarGroup>
      <SidebarGroup label="Chat">
        <SidebarLink href="#">Roles</SidebarLink>
      </SidebarGroup>
      <SidebarGroup label="Text">
        <SidebarLink href="/templates">Templates</SidebarLink>
        <SidebarLink href="/categories">Categories</SidebarLink>
      </SidebarGroup>
      <SidebarGroup label="Image">
        <SidebarLink href="#">Templates</SidebarLink>
      </SidebarGroup>
    </SidebarLayout>
  );
}
