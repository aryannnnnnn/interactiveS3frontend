import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { useFileStore } from "@/store/useFileStore";
import { useStore } from "zustand";

function AppSidebar() {
  const availBuckets = useStore(useFileStore, (state) => state.availBuckets);
  const setSelectedBucketname = useStore(
    useFileStore,
    (state) => state.setSelectedBucketName,
  );
  const data = {
    navMain: [
      {
        title: "Buckets",
        items: availBuckets?.map((bucket) => ({ title: bucket })),
      },
    ],
  };

  const changeSelectedBucket = (bucketName: string) => {
    setSelectedBucketname(bucketName);
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row justify-between">
        <span>Options</span> <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {data.navMain?.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/colapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items?.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <span
                            onClick={() => changeSelectedBucket(item.title)}
                            onKeyDown={() => changeSelectedBucket(item.title)}
                          >
                            {item.title}
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
export default AppSidebar;
