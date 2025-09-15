import { useState } from "react";
import type { TPageDesign, TInputComponentDesign } from "@/types/quizType";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/auth";
import { quizApi } from "@/api/quizApi";
import { useLoading } from "@/contexts/LoadingContext";
import { showErrorDialog, showInfoDialog } from "@/utils/myConfirm";
import { PresentationHeader } from "./components/PresentationHeader";
import { RegisterRow } from "./components/RegisterRow";
import { PageCard } from "./components/PageCard";
import { quizGeneratorApi } from "@/api/quizGeneratorApi";

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
  onResetToEmpty: () => void;
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
  onResetToEmpty,
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
  const navigate = useNavigate();
  const { user } = useAuth();
  const { show, hide } = useLoading();
  const [quizName, setQuizName] = useState<string>("");

  const handleCopyJson = () => {
    const jsonString = JSON.stringify(pageDesigns, null, 2);
    navigator.clipboard.writeText(jsonString).then(async () => {
      await showInfoDialog('JSONをクリップボードにコピーしました');
    }).catch(async () => {
      await showErrorDialog('コピーに失敗しました');
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

  const handleUploadFile = async (file: File) => {
    try {
      show('アップロード中です...');
      const response = await quizApi.uploadQuizSource(file);
      hide();
      show(`アップロードに成功しました。クイズを作成中です...`);
      const quizDesigns = await quizGeneratorApi.generateQuiz(response.key,3);
      onResetToEmpty();
      quizDesigns.forEach((quizDesign) => {
        onAddPage(quizDesign);
      });
      hide();
      await showInfoDialog('クイズを作成しました。');
    } catch (e) {
      hide();
      await showErrorDialog('アップロードに失敗しました');
    } 
  };

  const handleRegister = async () => {
    if (!user) {
      await showErrorDialog('ログイン情報を確認できません。再度ログインしてください。');
      return;
    }
    if (!quizName.trim()) {
      await showErrorDialog('クイズ名を入力してください');
      return;
    }
    const result = onValidate();
    if (!result.isValid) {
      setValidationResult(result);
      setIsValidationDialogOpen(true);
      await showErrorDialog('バリデーションエラーを解消してください');
      return;
    }
    try {
      show('登録中です...');
      await quizApi.createQuiz(user.id, quizName.trim(), pageDesigns);
      hide();
      await showInfoDialog('クイズを登録しました');
      navigate({ to: "/quiz" });
    } catch (e) {
      hide();
      await showErrorDialog('登録に失敗しました。時間をおいて再度お試しください。');
    }
  };
  return (
    <div className="space-y-8 p-6">
      <PresentationHeader />

      {/* ボタン一覧：左 リセット/テンプレート、右 バリデーション/JSON表示 */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          <Button onClick={onResetToEmpty} variant="outline" className="bg-gray-50 border-gray-300 text-gray-800 hover:bg-gray-100">
            すべて削除
          </Button>
          <Button onClick={onResetToMinimal} variant="outline" className="bg-red-50 border-red-300 text-red-800 hover:bg-red-100">
            質問をリセット
          </Button>
          <Button onClick={onResetToTemplate} variant="outline" className="bg-blue-50 border-blue-300 text-blue-800 hover:bg-blue-100">
            テンプレートを使用
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
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
        </div>
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

      {/* 登録行 */}
      <RegisterRow
        quizName={quizName}
        onChangeQuizName={setQuizName}
        onRegister={handleRegister}
        disabled={!user}
        onAddPage={() => {
          const newPageId = `page_${Date.now()}`;
          onAddPage({
            pageId: newPageId,
            components: []
          });
        }}
        onUploadFile={handleUploadFile}
      />
      
      {pageDesigns.map((pageDesign, pageIndex) => (
        <PageCard
          key={pageDesign.pageId}
          pageDesign={pageDesign}
          pageIndex={pageIndex}
          onUpdateQuiz={onUpdateQuiz}
          onAddQuiz={onAddQuiz}
          onDeleteQuiz={onDeleteQuiz}
          onDeletePage={onDeletePage}
          onMoveQuizUp={onMoveQuizUp}
          onMoveQuizDown={onMoveQuizDown}
          onStartEditPageId={handleStartEditPageId}
          isEditing={editingPageId === pageDesign.pageId}
          tempPageId={tempPageId}
          setTempPageId={setTempPageId}
          onSavePageId={handleSavePageId}
          onCancelEditPageId={handleCancelEditPageId}
        />
      ))}
    </div>
  );
};

export default QuizPresentation;
