import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_users")({
  beforeLoad: ({ context, location }) => {
    const requiredPermissions = ["read", "write", "*"];
    if (!context.auth.hasAnyPermission(requiredPermissions)) {
      throw redirect({
        to: "/unauthorized",
        search: {
          redirect: location.href,
          reason: "insufficient_permissions",
        },
      });
    }
  },
  component: () => <Outlet />,
});
