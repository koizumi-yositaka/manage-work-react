import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export function PresentationHeader() {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">クイズ管理</h1>
          <p className="text-gray-600">クイズの作成・編集・管理を行います</p>
        </div>
        <Button 
          onClick={() => navigate({ to: "/quiz" })}
          variant="outline"
          className="flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          一覧に戻る
        </Button>
      </div>
    </div>
  );
}


