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
import type { AuthState } from "@/auth";

export const MwSidebarContent = ({ auth }: { auth: AuthState }) => {
  const items = [
    {
      title: "TOP",
      role: ["users", "admin", "moderator"],
      url: "/dashboard",
    },
    {
      title: "ユーザ",
      role: ["admin", "moderator","users"],
      url: "/manage",
    },
    {
      title: "モデレータ",
      role: ["admin", "moderator"],
      url: "/moderator",
    },
    {
      title: "管理者",
      role: ["admin"],
      url: "/admin",
    },
    {
      title: "クイズ",
      role: ["admin", "moderator","users"],
      url: "/quiz",
    },
  ];
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.filter((item) => auth.hasAnyRole(item.role)).map((item) => (
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
