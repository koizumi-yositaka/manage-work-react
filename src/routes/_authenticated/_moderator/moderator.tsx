import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_moderator/moderator")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>モデレータページ</div>;
}
