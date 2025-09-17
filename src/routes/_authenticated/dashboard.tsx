import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { confirm } from "@/utils/myConfirm";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardComponent,
});

function DashboardComponent() {
  const { auth } = Route.useRouteContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await confirm("ログアウトしますか？");
    if (!result) return;
    await auth.logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          variant="destructive"
        >
          Sign Out
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
        <p className="text-gray-600">
          ようこそ, <strong>{auth.user?.email}</strong>
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">権限ごとのリンク確認</h2>
        <ul className="text-gray-600 list-disc list-inside space-y-2">
          <li>
            <Link to="/manage">ユーザ管理</Link>
          </li>
          <li>
            <Link to="/moderator">モデレータ管理</Link>
          </li>
          <li>
            <Link to="/admin">管理者管理</Link>
          </li>
          <li>
            <Link to="/quiz">クイズ管理</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
