import { QuizCard } from "./QuizCard";
import { EmptyState } from "./EmptyState";

interface QuizListProps {
  quizzes: Array<{
    quizId: string;
    quizName: string;
    quizCreatedAt: string;
    quizResponseSituations: Array<{
      respondentEmail: string;
      version: number;
      score: number;
      responseCreatedAt: string;
    }>;
  }>;
  onShowDetails: (quiz: any) => void;
}

export const QuizList = ({ quizzes, onShowDetails }: QuizListProps) => {
  if (quizzes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">作成したクイズ一覧</h2>
      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <QuizCard 
            key={quiz.quizId} 
            quiz={quiz} 
            onShowDetails={onShowDetails} 
          />
        ))}
      </div>
    </div>
  );
};
