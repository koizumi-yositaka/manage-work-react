import type { TInputContentDesign, EnumInputComponentType } from "@/types/quizType";
import { QuizOptionsEdit } from "./QuizOptionsEdit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QuizContentEditProps {
  content: TInputContentDesign;
  isEditing: boolean;
  onContentChange: (newContent: TInputContentDesign) => void;
  answerType: EnumInputComponentType;
}

export const QuizContentEdit = ({ content, isEditing, onContentChange, answerType }: QuizContentEditProps) => {
  const handleQuestionChange = (newQuestion: string) => {
    onContentChange({
      ...content,
      q: newQuestion
    });
  };


  const handleNameChange = (newName: string) => {
    onContentChange({
      ...content,
      name: newName
    });
  };

  const handleRequiredMessageChange = (newMessage: string) => {
    onContentChange({
      ...content,
      requiredMessage: newMessage
    });
  };

  const handleOptionsChange = (newOptions: typeof content.options) => {
    onContentChange({
      ...content,
      options: newOptions
    });
  };

  return (
    <div className="space-y-4">
      {/* 質問文 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-base font-medium text-blue-900 mb-2">質問文</h4>
        {isEditing ? (
          <Input
            value={content.q}
            onChange={(e) => handleQuestionChange(e.target.value)}
            className="text-blue-800 bg-white border-blue-300"
            placeholder="質問文を入力してください"
          />
        ) : (
          <p className="text-blue-800">{content.q}</p>
        )}
      </div>

      {/* メタ情報 */}
      <div className="bg-gray-50 p-3 rounded-md">
        <Label className="font-medium text-gray-600">フィールド名:</Label>
        {isEditing ? (
          <Input
            value={content.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="mt-1 font-mono bg-white border-gray-300"
            placeholder="フィールド名を入力してください"
          />
        ) : (
          <span className="ml-2 text-gray-800 font-mono">{content.name}</span>
        )}
      </div>

      {/* 選択肢 - 選択肢が必要な回答形式のみ表示 */}
      {(answerType === "radio" || answerType === "select" || answerType === "checkbox") && (
        <div>
          <h4 className="text-base font-medium text-gray-700 mb-3">選択肢</h4>
          <QuizOptionsEdit 
            options={content.options} 
            isEditing={isEditing}
            onOptionsChange={handleOptionsChange}
          />
        </div>
      )}

      {/* 必須メッセージ */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
        <Label className="text-sm font-medium text-red-800">必須メッセージ:</Label>
        {isEditing ? (
          <Input
            value={content.requiredMessage}
            onChange={(e) => handleRequiredMessageChange(e.target.value)}
            className="mt-1 text-sm text-red-700 bg-white border-red-300"
            placeholder="必須メッセージを入力してください"
          />
        ) : (
          <span className="text-sm text-red-700">{content.requiredMessage || "なし"}</span>
        )}
      </div>
    </div>
  );
};
