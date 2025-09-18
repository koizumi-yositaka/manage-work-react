import { useState } from "react";
import { quizApi } from "@/api/quizApi";
import { sendEmail } from "@/api/authApi";
import { showErrorDialog } from "@/utils/myConfirm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/contexts/LoadingContext";

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
  const accessToken = localStorage.getItem('auth-token');
  const { show, hide } = useLoading();
  const handleDistribute = () => {
    setIsDistributing(true);
  };

  const handleCancelDistribute = () => {
    setIsDistributing(false);
    setEmailList("");
  };

  const handleSendDistribution = async () => {
    show('配信中です...');
    const recipients = emailList
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    try {
      await quizApi.distributeQuiz(accessToken ?? "", quiz.quizId, recipients);
      await sendEmail(accessToken ?? "", quiz.quizId, recipients);
      setIsDistributing(false);
      setEmailList("");
      hide();
    } catch (e) {
      hide();
      setIsDistributing(false);
      await showErrorDialog('配信に失敗しました');
    } 
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
      </div>

      <Dialog open={isDistributing} onOpenChange={setIsDistributing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>クイズ配信</DialogTitle>
            <DialogDescription>
              配信先メールアドレスをカンマ区切りで入力してください。
            </DialogDescription>
          </DialogHeader>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              配信先メールアドレス（カンマ区切り）
            </label>
            <textarea
              value={emailList}
              onChange={(e) => setEmailList(e.target.value)}
              placeholder="example1@email.com, example2@email.com, example3@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancelDistribute}
            >
              キャンセル
            </Button>
            <Button onClick={handleSendDistribution} disabled={emailList.trim().length === 0}>
              送信
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};