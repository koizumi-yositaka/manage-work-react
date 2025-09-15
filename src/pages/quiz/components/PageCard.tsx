import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TInputComponentDesign, TPageDesign } from "@/types/quizType";
import { QuizEdit } from "@/pages/quiz/QuizEdit";

type PageCardProps = {
  pageDesign: TPageDesign;
  pageIndex: number;
  onUpdateQuiz: (pageId: string, componentId: string, updatedQuiz: TInputComponentDesign) => void;
  onAddQuiz: (pageId: string, newQuiz: TInputComponentDesign) => void;
  onDeleteQuiz: (pageId: string, componentId: string) => void;
  onDeletePage: (pageId: string) => void;
  onMoveQuizUp: (pageId: string, componentId: string) => void;
  onMoveQuizDown: (pageId: string, componentId: string) => void;
  onStartEditPageId: (pageId: string) => void;
  isEditing: boolean;
  tempPageId: string;
  setTempPageId: (id: string) => void;
  onSavePageId: () => void;
  onCancelEditPageId: () => void;
};

export function PageCard({
  pageDesign,
  pageIndex,
  onUpdateQuiz,
  onAddQuiz,
  onDeleteQuiz,
  onDeletePage,
  onMoveQuizUp,
  onMoveQuizDown,
  onStartEditPageId,
  isEditing,
  tempPageId,
  setTempPageId,
  onSavePageId,
  onCancelEditPageId,
}: PageCardProps) {
  return (
    <div className="border-2 border-gray-200 rounded-lg p-6 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          ページ {pageIndex + 1}
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={tempPageId}
                  onChange={(e) => setTempPageId(e.target.value)}
                  className="text-sm font-mono"
                  placeholder="ページID"
                />
                <Button 
                  onClick={onSavePageId}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  保存
                </Button>
                <Button 
                  onClick={onCancelEditPageId}
                  size="sm"
                  variant="outline"
                >
                  キャンセル
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  ID: {pageDesign.pageId}
                </span>
                <Button 
                  onClick={() => onStartEditPageId(pageDesign.pageId)}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  編集
                </Button>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={() => {
                onAddQuiz(pageDesign.pageId, {
                  id: "",
                  type: "radio",
                  answer: "",
                  content: {
                    q: "新しい質問",
                    qIndex: 1,
                    name: `field_${Date.now()}`,
                    options: [
                      { label: "選択肢1", value: "option1" },
                      { label: "選択肢2", value: "option2" },
                    ],
                    requiredMessage: "選択してください",
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
        {pageDesign.components.map((component, index) => (
          <div key={component.id} className="border border-gray-100 rounded-md p-4 bg-gray-50">
            <QuizEdit 
              quiz={component} 
              pageId={pageDesign.pageId}
              onUpdateQuiz={onUpdateQuiz}
              onDeleteQuiz={onDeleteQuiz}
              onMoveQuizUp={onMoveQuizUp}
              onMoveQuizDown={onMoveQuizDown}
              isFirst={index === 0}
              isLast={index === pageDesign.components.length - 1}
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
  );
}


