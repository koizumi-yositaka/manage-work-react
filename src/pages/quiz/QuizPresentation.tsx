import { useState } from "react";
import type { TPageDesign, TInputComponentDesign } from "@/types/quizType";
import { QuizEdit } from "./QuizEdit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ValidationError {
  type: 'quiz_id_duplicate' | 'empty_options' | 'empty_page' | 'empty_field_name';
  message: string;
  pageId?: string;
  quizId?: string;
  quizFieldName?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

interface QuizPresentationProps {
  pageDesigns: TPageDesign[];
  onUpdateQuiz: (pageId: string, componentId: string, updatedQuiz: TInputComponentDesign) => void;
  onAddQuiz: (pageId: string, newQuiz: TInputComponentDesign) => void;
  onDeleteQuiz: (pageId: string, componentId: string) => void;
  onAddPage: (newPage: TPageDesign) => void;
  onDeletePage: (pageId: string) => void;
  onUpdatePageId: (oldPageId: string, newPageId: string) => void;
  onResetToMinimal: () => void;
  onResetToTemplate: () => void;
  onMoveQuizUp: (pageId: string, componentId: string) => void;
  onMoveQuizDown: (pageId: string, componentId: string) => void;
  onValidate: () => ValidationResult;
}

const QuizPresentation = ({ 
  pageDesigns, 
  onUpdateQuiz, 
  onAddQuiz, 
  onDeleteQuiz, 
  onAddPage, 
  onDeletePage, 
  onUpdatePageId,
  onResetToMinimal,
  onResetToTemplate,
  onMoveQuizUp, 
  onMoveQuizDown, 
  onValidate 
}: QuizPresentationProps) => {
  const [isJsonDialogOpen, setIsJsonDialogOpen] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidationDialogOpen, setIsValidationDialogOpen] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [tempPageId, setTempPageId] = useState<string>("");

  const handleCopyJson = () => {
    const jsonString = JSON.stringify(pageDesigns, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      alert('JSONをクリップボードにコピーしました');
    }).catch(() => {
      alert('コピーに失敗しました');
    });
  };

  const handleStartEditPageId = (pageId: string) => {
    setEditingPageId(pageId);
    setTempPageId(pageId);
  };

  const handleSavePageId = () => {
    if (editingPageId && tempPageId.trim() !== '') {
      onUpdatePageId(editingPageId, tempPageId.trim());
      setEditingPageId(null);
      setTempPageId("");
    }
  };

  const handleCancelEditPageId = () => {
    setEditingPageId(null);
    setTempPageId("");
  };

  const handleValidate = () => {
    const result = onValidate();
    setValidationResult(result);
    setIsValidationDialogOpen(true);
  };
  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">クイズ管理</h1>
        <div className="flex space-x-2">
          <Button onClick={onResetToMinimal} variant="outline" className="bg-red-50 border-red-300 text-red-800 hover:bg-red-100">
            リセット
          </Button>
          <Button onClick={onResetToTemplate} variant="outline" className="bg-blue-50 border-blue-300 text-blue-800 hover:bg-blue-100">
            テンプレート
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
          <Button onClick={handleValidate} variant="outline" className="bg-yellow-50 border-yellow-300 text-yellow-800 hover:bg-yellow-100">
            バリデーション
          </Button>
          <Dialog open={isJsonDialogOpen} onOpenChange={setIsJsonDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                JSON表示
              </Button>
            </DialogTrigger>
            <DialogContent 
              className="w-[95vw] max-w-none max-h-[80vh] overflow-auto"
              style={{ width: '95vw', maxWidth: 'none' }}
            >
              <DialogHeader>
                <DialogTitle>現在のページデータ（JSON）</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button onClick={handleCopyJson} size="sm" variant="outline">
                    コピー
                  </Button>
                </div>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                  {JSON.stringify(pageDesigns, null, 2)}
                </pre>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isValidationDialogOpen} onOpenChange={setIsValidationDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>
                  バリデーション結果
                  {validationResult?.isValid ? (
                    <span className="text-green-600 ml-2">✓ 正常</span>
                  ) : (
                    <span className="text-red-600 ml-2">✗ エラーあり</span>
                  )}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {validationResult?.isValid ? (
                  <div className="text-green-600 bg-green-50 p-4 rounded-lg">
                    すべてのバリデーションを通過しました。データは正常です。
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-red-600 bg-red-50 p-4 rounded-lg">
                      {validationResult?.errors.length}個のエラーが見つかりました。
                    </div>
                    <div className="space-y-2">
                      {validationResult?.errors.map((error, index) => (
                        <div key={index} className="bg-red-50 border border-red-200 p-3 rounded-lg">
                          <div className="text-red-800 font-medium">{error.message}</div>
                          {error.pageId && (
                            <div className="text-sm text-red-600 mt-1">
                              ページID: {error.pageId}
                            </div>
                          )}
                          {error.quizFieldName && (
                            <div className="text-sm text-red-600 mt-1">
                              フィールド名: {error.quizFieldName}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {pageDesigns.map((pageDesign, pageIndex) => (
        <div key={pageDesign.pageId} className="border-2 border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              ページ {pageIndex + 1}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {editingPageId === pageDesign.pageId ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      value={tempPageId}
                      onChange={(e) => setTempPageId(e.target.value)}
                      className="text-sm font-mono"
                      placeholder="ページID"
                    />
                    <Button 
                      onClick={handleSavePageId}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      保存
                    </Button>
                    <Button 
                      onClick={handleCancelEditPageId}
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
                      onClick={() => handleStartEditPageId(pageDesign.pageId)}
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
                      id: "", // 自動生成されるため空文字
                      type: "radio",
                      answer: "",
                      content: {
                        q: "新しい質問",
                        qIndex: 1, // 自動で計算されるため一時的な値
                        name: `field_${Date.now()}`, // フィールド名は一時的な値
                        options: [
                          { label: "選択肢1", value: "option1" },
                          { label: "選択肢2", value: "option2" },
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
      ))}
    </div>
  );
};

export default QuizPresentation;
