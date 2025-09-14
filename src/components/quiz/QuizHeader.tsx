import { useNavigate } from "@tanstack/react-router";

export const QuizHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">クイズ管理</h1>
        <p className="text-gray-600 mt-2">作成したクイズの一覧と管理</p>
      </div>
      <button 
        onClick={() => navigate({ to: "/quiz/create" })}
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        クイズを作成
      </button>
    </div>
  );
};
