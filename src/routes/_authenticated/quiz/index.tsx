import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useQuizSituation } from "@/hooks/useQuizSituation";
import { useState } from "react";
import { QuizHeader } from "@/components/quiz/QuizHeader";
import { QuizList } from "@/components/quiz/QuizList";
import { QuizDetailsModal } from "@/components/quiz/QuizDetailsModal";
import { LoadingState } from "@/components/quiz/LoadingState";
import { ErrorState } from "@/components/quiz/ErrorState";
import { EmptyState } from "@/components/quiz/EmptyState";

export const Route = createFileRoute("/_authenticated/quiz/")({
  component: QuizListComponent,
  loader: async ({context}) => {
    const auth = context.auth;
    const userName = auth.user?.username;
    if (!userName) {
      throw new Error("User name not found");
    }
    return {userName};
  },
});

function QuizListComponent() {
  const { userName } = useLoaderData({ from: "/_authenticated/quiz/" });
  const { data: situation, isLoading, error } = useQuizSituation(userName);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowDetails = (quiz: any) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (error) {
    return <ErrorState error={error} />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <QuizHeader />
      
      {situation && situation.result ? (
        <QuizList 
          quizzes={situation.result} 
          onShowDetails={handleShowDetails} 
        />
      ) : (
        <EmptyState />
      )}
      
      <QuizDetailsModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedQuiz={selectedQuiz}
      />
    </div>
  );
}
