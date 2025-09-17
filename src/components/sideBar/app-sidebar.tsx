import { Sidebar } from "@/components/ui/sidebar";
import { MwSidebarHeader } from "./mw-sidebar-header";
import { MwSidebarContent } from "./mw-sidebar-content";
import { MwSidebarFooter } from "./mw-sidebar-footer";
import type { AuthState } from "@/auth";
export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  auth: AuthState;
}) {
  return (
    <Sidebar {...props} collapsible="offcanvas">
      <MwSidebarHeader auth={props.auth} />
      <MwSidebarContent auth={props.auth}/>
      <MwSidebarFooter auth={props.auth} />
    </Sidebar>
  );
}
