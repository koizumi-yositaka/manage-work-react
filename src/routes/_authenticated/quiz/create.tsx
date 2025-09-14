import { createFileRoute } from "@tanstack/react-router";
import { QuizContainer } from "@/pages/quiz/QuizContainer";

export const Route = createFileRoute("/_authenticated/quiz/create")({
  component: QuizCreateComponent,   
});

function QuizCreateComponent() {
  return <QuizContainer />;
}
