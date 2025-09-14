import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface QuizDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedQuiz: {
    quizId: string;
    quizName: string;
    quizCreatedAt: string;
    quizResponseSituations: Array<{
      respondentEmail: string;
      version: number;
      score: number;
      responseCreatedAt: string;
    }>;
  } | null;
}

export const QuizDetailsModal = ({ isOpen, onClose, selectedQuiz }: QuizDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-w-[90vw] max-h-[80vh] min-h-[400px] overflow-auto flex flex-col">
        <DialogHeader className="pb-2 h-auto gap-0 flex-shrink-0">
          <DialogTitle className="text-lg leading-tight">
            {selectedQuiz ? `${selectedQuiz.quizName} - 回答詳細` : '回答詳細'}
          </DialogTitle>
        </DialogHeader>
        
        {selectedQuiz && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">作成日時:</span> {new Date(selectedQuiz.quizCreatedAt).toLocaleString('ja-JP')}
              </div>
              <div>
                <span className="font-medium">総回答数:</span> {selectedQuiz.quizResponseSituations.length}人
              </div>
            </div>

            {selectedQuiz.quizResponseSituations.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        回答者メール
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        バージョン
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        スコア
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        回答日時
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedQuiz.quizResponseSituations.map((response, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {response.respondentEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {response.version}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            response.score >= 80 ? 'bg-green-100 text-green-800' :
                            response.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {response.score}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(response.responseCreatedAt).toLocaleString('ja-JP')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">回答がありません</h3>
                <p className="mt-1 text-sm text-gray-500">まだ誰もこのクイズに回答していません。</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
