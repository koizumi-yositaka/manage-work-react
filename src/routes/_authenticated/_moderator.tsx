import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_moderator")({
  beforeLoad: ({ context, location }) => {
    const allowedRoles = ["admin", "moderator"];
    if (!context.auth.hasAnyRole(allowedRoles)) {
      throw redirect({
        to: "/unauthorized",
        search: {
          redirect: location.href,
          reason: "insufficient_role",
        },
      });
    }
  },
  component: ModeratorLayout,
});

function ModeratorLayout() {
  const { auth } = Route.useRouteContext();

  return (
    <div>
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
        <strong>Moderator Area:</strong> Role: {auth.user?.roles.join(", ")}
      </div>
      <Outlet />
    </div>
  );
}
