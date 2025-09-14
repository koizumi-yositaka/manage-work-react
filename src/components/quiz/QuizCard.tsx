import { useState } from "react";
import { quizApi } from "@/api/quizApi";

interface QuizCardProps {
  quiz: {
    quizId: string;
    quizName: string;
    quizCreatedAt: string;
    quizResponseSituations: Array<{
      respondentEmail: string;
      version: number;
      score: number;
      responseCreatedAt: string;
    }>;
  };
  onShowDetails: (quiz: any) => void;
}

export const QuizCard = ({ quiz, onShowDetails }: QuizCardProps) => {
  const [isDistributing, setIsDistributing] = useState(false);
  const [emailList, setEmailList] = useState("");
  const [isSending, setIsSending] = useState(false);
  const accessToken = localStorage.getItem('auth-token');

  const handleDistribute = () => {
    setIsDistributing(true);
  };

  const handleCancelDistribute = () => {
    setIsDistributing(false);
    
    setEmailList("");
  };

  const handleSendDistribution = async () => {
    // TODO: 配信ロジックを実装 ここでAPI呼び出し
    setIsSending(true);
    console.log("配信先メール:", emailList);
    console.log("クイズID:", quiz.quizId);
    await quizApi.distributeQuiz(accessToken ?? "", quiz.quizId, emailList.split(","));
    handleCancelDistribute();
    setIsSending(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{quiz.quizName}</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">作成日時</span>
          <span className="text-sm text-gray-900">
            {new Date(quiz.quizCreatedAt).toLocaleDateString('ja-JP')}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">回答者数</span>
          <span className="text-sm text-gray-900 font-semibold">
            {quiz.quizResponseSituations.length}人
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        {!isDistributing ? (
          <div className="flex space-x-2">
            <button 
              onClick={() => onShowDetails(quiz)}
              className="flex-1 bg-blue-600 text-white text-sm py-2 px-3 rounded hover:bg-blue-700 transition-colors"
            >
              詳細を見る
            </button>
            <button 
              onClick={handleDistribute}
              className="flex-1 bg-green-600 text-white text-sm py-2 px-3 rounded hover:bg-green-700 transition-colors"
            >
              配信
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                配信先メールアドレス（カンマ区切り）
              </label>
              <textarea
                value={emailList}
                onChange={(e) => setEmailList(e.target.value)}
                placeholder="example1@email.com, example2@email.com, example3@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleSendDistribution}
                className="flex-1 bg-green-600 text-white text-sm py-2 px-3 rounded hover:bg-green-700 transition-colors"
              >
                {isSending ? "送信中..." : "送信"}
              </button>
              <button 
                onClick={handleCancelDistribute}
                className="flex-1 bg-gray-500 text-white text-sm py-2 px-3 rounded hover:bg-gray-600 transition-colors" disabled={isSending}
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};