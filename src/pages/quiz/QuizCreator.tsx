import type { TPageDesign } from "@/types/quizType";
import QuizPresentation from "./QuizPresentation";
import { useQuizManagement } from "@/hooks/useQuizManagement";

export const QuizCreator = () => {
  const initialData: TPageDesign[] = [
    {
      pageId: "basic_info",
      components: [
        {
          id: "favorite_color",
          type: "radio",
          answer: "blue",
          content: {
            q: "あなたの好きな色は何ですか？",
            qIndex: 1,
            name: "favorite_color",
            options: [
              { label: "赤", value: "red" },
              { label: "青", value: "blue" },
              { label: "緑", value: "green" },
              { label: "黄", value: "yellow" },
            ],
            requiredMessage: "色を選択してください",
          },
        },
        {
          id: "programming_experience",
          type: "radio",
          answer: "intermediate",
          content: {
            q: "プログラミングの経験はどの程度ですか？",
            qIndex: 2,
            name: "programming_experience",
            options: [
              { label: "初心者（1年未満）", value: "beginner" },
              { label: "中級者（1-3年）", value: "intermediate" },
              { label: "上級者（3年以上）", value: "advanced" },
              { label: "エキスパート（5年以上）", value: "expert" },
            ],
            requiredMessage: "経験レベルを選択してください",
          },
        },
      ],
    },
    {
      pageId: "preferences",
      components: [
        {
          id: "work_style",
          type: "radio",
          answer: "remote",
          content: {
            q: "どのような働き方を希望しますか？",
            qIndex: 1,
            name: "work_style",
            options: [
              { label: "オフィス勤務", value: "office" },
              { label: "リモートワーク", value: "remote" },
              { label: "ハイブリッド（オフィス+リモート）", value: "hybrid" },
            ],
            requiredMessage: "働き方を選択してください",
          },
        },
        {
          id: "team_size",
          type: "radio",
          answer: "medium",
          content: {
            q: "理想的なチームサイズはどのくらいですか？",
            qIndex: 2,
            name: "team_size",
            options: [
              { label: "小規模（2-5人）", value: "small" },
              { label: "中規模（6-15人）", value: "medium" },
              { label: "大規模（16人以上）", value: "large" },
            ],
            requiredMessage: "チームサイズを選択してください",
          },
        },
        {
          id: "learning_goals",
          type: "radio",
          answer: "frontend",
          content: {
            q: "今後最も学びたい技術分野は何ですか？",
            qIndex: 3,
            name: "learning_goals",
            options: [
              { label: "フロントエンド開発", value: "frontend" },
              { label: "バックエンド開発", value: "backend" },
              { label: "モバイルアプリ開発", value: "mobile" },
              { label: "AI・機械学習", value: "ai" },
              { label: "DevOps・インフラ", value: "devops" },
            ],
            requiredMessage: "学習したい分野を選択してください",
          },
        },
      ],
    },
  ];

  const {
    pageDesigns,
    updateQuiz,
    addQuiz,
    deleteQuiz,
    addPage,
    deletePage,
    updatePageId,
    resetToMinimal,
    resetToTemplate,
    moveQuizUp,
    moveQuizDown,
    validateData
  } = useQuizManagement(initialData);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">クイズ作成</h1>
        <p className="text-gray-600 mt-2">新しいクイズを作成・編集</p>
      </div>
      
      <QuizPresentation 
        pageDesigns={pageDesigns}
        onUpdateQuiz={updateQuiz}
        onAddQuiz={addQuiz}
        onDeleteQuiz={deleteQuiz}
        onAddPage={addPage}
        onDeletePage={deletePage}
        onUpdatePageId={updatePageId}
        onResetToMinimal={resetToMinimal}
        onResetToTemplate={resetToTemplate}
        onMoveQuizUp={moveQuizUp}
        onMoveQuizDown={moveQuizDown}
        onValidate={validateData}
      />
    </div>
  );
};
