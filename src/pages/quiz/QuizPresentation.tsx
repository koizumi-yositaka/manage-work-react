import type { TPageDesign, TInputComponentDesign } from "@/types/quizType";
import { QuizEdit } from "./QuizEdit";
import { Button } from "@/components/ui/button";

interface QuizPresentationProps {
  pageDesigns: TPageDesign[];
  onUpdateQuiz: (pageId: string, componentId: string, updatedQuiz: TInputComponentDesign) => void;
  onAddQuiz: (pageId: string, newQuiz: TInputComponentDesign) => void;
  onDeleteQuiz: (pageId: string, componentId: string) => void;
  onAddPage: (newPage: TPageDesign) => void;
  onDeletePage: (pageId: string) => void;
  onReset: () => void;
}

const QuizPresentation = ({ 
  pageDesigns, 
  onUpdateQuiz, 
  onAddQuiz, 
  onDeleteQuiz, 
  onAddPage, 
  onDeletePage, 
  onReset 
}: QuizPresentationProps) => {
  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">クイズ管理</h1>
        <div className="flex space-x-2">
          <Button onClick={onReset} variant="outline">
            リセット
          </Button>
          <Button onClick={() => {
            const newPageId = `page_${Date.now()}`;
            onAddPage({
              pageId: newPageId,
              components: []
            });
          }}>
            ページを追加
          </Button>
        </div>
      </div>
      
      {pageDesigns.map((pageDesign, pageIndex) => (
        <div key={pageDesign.pageId} className="border-2 border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              ページ {pageIndex + 1}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                ID: {pageDesign.pageId}
              </span>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => {
                    const newQuizId = `quiz_${Date.now()}`;
                    onAddQuiz(pageDesign.pageId, {
                      id: newQuizId,
                      type: "radio",
                      answer: "",
                      content: {
                        q: "新しい質問",
                        qIndex: 1, // 自動で計算されるため一時的な値
                        name: newQuizId,
                        options: [
                          { id: "1", label: "選択肢1", value: "option1" },
                          { id: "2", label: "選択肢2", value: "option2" },
                        ],
                        requiredMessage: "",
                      },
                    });
                  }}
                  size="sm"
                  variant="outline"
                >
                  質問を追加
                </Button>
                <Button 
                  onClick={() => onDeletePage(pageDesign.pageId)}
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  ページを削除
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {pageDesign.components.map((component) => (
              <div key={component.id} className="border border-gray-100 rounded-md p-4 bg-gray-50">
                <QuizEdit 
                  quiz={component} 
                  pageId={pageDesign.pageId}
                  onUpdateQuiz={onUpdateQuiz}
                  onDeleteQuiz={onDeleteQuiz}
                />
              </div>
            ))}
            {pageDesign.components.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                このページには質問がありません。質問を追加してください。
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizPresentation;
