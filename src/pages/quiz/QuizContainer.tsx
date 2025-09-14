import type { TPageDesign } from "@/types/quizType";
import QuizPresentation from "./QuizPresentation";
import { useQuizManagement } from "@/hooks/useQuizManagement";

export const QuizContainer = () => {
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
              { id: "red", label: "赤", value: "red" },
              { id: "blue", label: "青", value: "blue" },
              { id: "green", label: "緑", value: "green" },
              { id: "yellow", label: "黄", value: "yellow" },
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
              { id: "beginner", label: "初心者（1年未満）", value: "beginner" },
              { id: "intermediate", label: "中級者（1-3年）", value: "intermediate" },
              { id: "advanced", label: "上級者（3年以上）", value: "advanced" },
              { id: "expert", label: "エキスパート（5年以上）", value: "expert" },
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
              { id: "office", label: "オフィス勤務", value: "office" },
              { id: "remote", label: "リモートワーク", value: "remote" },
              { id: "hybrid", label: "ハイブリッド（オフィス+リモート）", value: "hybrid" },
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
              { id: "small", label: "小規模（2-5人）", value: "small" },
              { id: "medium", label: "中規模（6-15人）", value: "medium" },
              { id: "large", label: "大規模（16人以上）", value: "large" },
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
              { id: "frontend", label: "フロントエンド開発", value: "frontend" },
              { id: "backend", label: "バックエンド開発", value: "backend" },
              { id: "mobile", label: "モバイルアプリ開発", value: "mobile" },
              { id: "ai", label: "AI・機械学習", value: "ai" },
              { id: "devops", label: "DevOps・インフラ", value: "devops" },
            ],
            requiredMessage: "学習したい分野を選択してください",
          },
        },
      ],
    },
  ];

  const { pageDesigns, updateQuiz, addQuiz, deleteQuiz, addPage, deletePage, resetToInitial } = useQuizManagement(initialData);

  return (
    <QuizPresentation 
      pageDesigns={pageDesigns}
      onUpdateQuiz={updateQuiz}
      onAddQuiz={addQuiz}
      onDeleteQuiz={deleteQuiz}
      onAddPage={addPage}
      onDeletePage={deletePage}
      onReset={resetToInitial}
    />
  );
};
