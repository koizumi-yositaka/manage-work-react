import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_admin/admin")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { auth } = Route.useRouteContext();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">管理者ダッシュボード</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">ユーザー管理</h2>
          <p className="text-gray-600">システム内のすべてのユーザーを管理します</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            ユーザー一覧を表示
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">システム設定</h2>
          <p className="text-gray-600">システム全体の設定を行います</p>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            設定を開く
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">レポート</h2>
          <p className="text-gray-600">システムのレポートと分析を表示します</p>
          <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            レポートを表示
          </button>
        </div>
      </div>

      <div className="mt-8 bg-gray-100 p-4 rounded">
        <h3 className="font-semibold">あなたの情報:</h3>
        <p>ユーザー名: {auth.user?.username}</p>
        <p>ロール: {auth.user?.roles.join("、")}</p>
        <p>権限: {auth.user?.permissions.join("、")}</p>
      </div>
    </div>
  );
}
