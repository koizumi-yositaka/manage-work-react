import { Link } from "@tanstack/react-router";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";

export const MwSidebarContent = () => {
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Users",
      url: "/manage",
    },
    {
      title: "Admin",
      url: "/admin",
    },
    {
      title: "Moderator",
      url: "/moderator",
    },
    {
      title: "Quiz",
      url: "/quiz",
    },
  ];
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    activeProps={{
                      className: "text-accent-foreground bg-primary/10",
                    }}
                    to={item.url}
                  >
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};
