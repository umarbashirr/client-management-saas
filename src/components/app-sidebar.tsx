"use client";

import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { workspaceId } = useParams();

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: `/workspace/${workspaceId}/dashboard`,
        icon: IconDashboard,
      },
      {
        title: "Clients",
        url: `/workspace/${workspaceId}/clients`,
        icon: IconUsers,
      },
      {
        title: "Projects",
        url: `/workspace/${workspaceId}/projects`,
        icon: IconFolder,
      },
      {
        title: "Accounts",
        url: `/workspace/${workspaceId}/accounts`,
        icon: IconListDetails,
      },
      {
        title: "Analytics",
        url: `/workspace/${workspaceId}/analytics`,
        icon: IconChartBar,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href={`/workspace/${workspaceId}/dashboard`}>
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Cliently</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
