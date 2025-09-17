import {
  createFileRoute,
  redirect,
  useLoaderData,
} from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sideBar/app-sidebar";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          // Save current location for redirect after login
          redirect: location.href,
        },
      });
    }
  },
  loader: ({ context }) => {
    return {
      auth: context.auth, // context から auth を取得して渡す
    };
  },
  component: AuthenticatedLayout,
});
function AuthenticatedLayout() {
  const { auth } = useLoaderData({ from: "/_authenticated" });
  return (
    <SidebarProvider>
      <AppSidebar auth={auth} />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <main>
          <div className="p-4">
            <Outlet />
          </div> 
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
// <SidebarProvider>
//   {/* <AppSidebar /> */}
//   <AppSidebar />
//   <SidebarInset>
//     <header className="flex h-16 shrink-0 items-center gap-2 border-b">
//       <SidebarTrigger className="-ml-1" />
//       <Separator
//         orientation="vertical"
//         className="mr-2 data-[orientation=vertical]:h-4"
//       />
//     </header>
//     <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6 overflow-y-hidden">
//       <Outlet />
//     </div>
//   </SidebarInset>
// </SidebarProvider>;
