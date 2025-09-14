import { useState } from "react";
import type { TInputComponentDesign, EnumInputComponentType } from "@/types/quizType";
import { QuizContentEdit } from "./QuizContentEdit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface QuizEditProps {
  quiz: TInputComponentDesign;
  pageId: string;
  onUpdateQuiz: (pageId: string, componentId: string, updatedQuiz: TInputComponentDesign) => void;
  onDeleteQuiz: (pageId: string, componentId: string) => void;
  onMoveQuizUp: (pageId: string, componentId: string) => void;
  onMoveQuizDown: (pageId: string, componentId: string) => void;
  isFirst: boolean;
  isLast: boolean;
}

const ANSWER_TYPE_OPTIONS: { value: EnumInputComponentType; label: string }[] = [
  { value: "radio", label: "ラジオボタン" },
  // { value: "text", label: "テキスト入力" },
  // { value: "textarea", label: "テキストエリア" },
  // { value: "checkbox", label: "チェックボックス" },
  // { value: "select", label: "セレクトボックス" },
];

export const QuizEdit = ({ quiz, pageId, onUpdateQuiz, onDeleteQuiz, onMoveQuizUp, onMoveQuizDown, isFirst, isLast }: QuizEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuiz, setEditedQuiz] = useState(quiz);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    // pageDesignsに変更を反映
    onUpdateQuiz(pageId, quiz.id, editedQuiz);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedQuiz(quiz);
    setIsEditing(false);
  };

  const handleTypeChange = (newType: EnumInputComponentType) => {
    setEditedQuiz(prev => ({
      ...prev,
      type: newType,
      // 回答形式が変わった場合、正解をリセット
      answer: ""
    }));
  };

  const handleAnswerChange = (newAnswer: string) => {
    setEditedQuiz(prev => ({
      ...prev,
      answer: newAnswer
    }));
  };

  const handleContentChange = (newContent: typeof quiz.content) => {
    setEditedQuiz(prev => ({
      ...prev,
      content: newContent
    }));
  };

  const getAnswerTypeLabel = (type: EnumInputComponentType) => {
    return ANSWER_TYPE_OPTIONS.find(option => option.value === type)?.label || type;
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border border-gray-200 rounded-lg bg-white">
        {/* ヘッダー部分 */}
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <div className="flex-1 text-left">
              <h3 className="text-lg font-medium text-gray-900">
                {isEditing ? editedQuiz.content.q : quiz.content.q}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                  {getAnswerTypeLabel(isEditing ? editedQuiz.type : quiz.type)}
                </span>
                <span className="text-sm text-gray-500">
                  正解: {isEditing ? editedQuiz.answer : quiz.answer}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              {isOpen && (
                <>
                  {/* 並び替えボタン */}
                  <div className="flex flex-col space-y-1">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveQuizUp(pageId, quiz.id);
                      }}
                      size="sm"
                      variant="outline"
                      disabled={isFirst}
                      className="h-6 w-6 p-0"
                      title="上に移動"
                    >
                      ↑
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveQuizDown(pageId, quiz.id);
                      }}
                      size="sm"
                      variant="outline"
                      disabled={isLast}
                      className="h-6 w-6 p-0"
                      title="下に移動"
                    >
                      ↓
                    </Button>
                  </div>
                  
                  {isEditing ? (
                    <>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSave();
                        }}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        保存
                      </Button>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancel();
                        }}
                        size="sm"
                        variant="outline"
                      >
                        キャンセル
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditing(true);
                        }}
                        size="sm"
                        variant="outline"
                      >
                        編集
                      </Button>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteQuiz(pageId, quiz.id);
                        }}
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        削除
                      </Button>
                    </>
                  )}
                </>
              )}
              <svg 
                className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </CollapsibleTrigger>

        {/* コンテンツ部分 */}
        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-4">
            {/* 回答形式の選択 */}
            {isEditing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Label className="text-base font-medium text-blue-900 mb-2 block">回答形式</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {getAnswerTypeLabel(editedQuiz.type)}
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    {ANSWER_TYPE_OPTIONS.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => handleTypeChange(option.value)}
                        className={editedQuiz.type === option.value ? "bg-blue-100" : ""}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            <QuizContentEdit 
              content={isEditing ? editedQuiz.content : quiz.content}
              isEditing={isEditing}
              onContentChange={handleContentChange}
              answerType={isEditing ? editedQuiz.type : quiz.type}
            />
            
            {/* 正解の設定 */}
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="space-y-2">
                <span className="text-sm font-medium text-yellow-800">正解:</span>
                {isEditing ? (
                  <div className="space-y-2">
                    {(editedQuiz.type === "radio" || editedQuiz.type === "select" || editedQuiz.type === "checkbox") ? (
                      // 選択肢から選択する場合
                      <div>
                        <Label className="text-xs text-gray-600">選択肢から正解を選択:</Label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                              {editedQuiz.content.options.find(opt => opt.value === editedQuiz.answer)?.label || "正解を選択してください"}
                              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full">
                            {editedQuiz.content.options.map((option,index) => (
                              <DropdownMenuItem
                                key={`${option.value}-${index}`}
                                onClick={() => handleAnswerChange(option.value)}
                                className={editedQuiz.answer === option.value ? "bg-yellow-100" : ""}
                              >
                                {option.label} ({option.value})
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ) : (
                      // 自由入力の場合
                      <div>
                        <Label className="text-xs text-gray-600">正解を入力:</Label>
                        {editedQuiz.type === "textarea" ? (
                          <textarea
                            value={editedQuiz.answer}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            className="w-full mt-1 p-2 text-sm font-mono bg-yellow-100 border border-yellow-300 rounded-md resize-vertical"
                            rows={3}
                            placeholder="正解を入力してください"
                          />
                        ) : (
                          <Input
                            value={editedQuiz.answer}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            className="text-sm font-mono bg-yellow-100 border-yellow-300"
                            placeholder="正解を入力してください"
                          />
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-yellow-700 font-mono bg-yellow-100 px-2 py-1 rounded">
                    {quiz.answer}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
