import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row justify-between">
        <span>Settings</span> <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
export default AppSidebar;
