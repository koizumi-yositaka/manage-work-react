import type { TInputComponentDesign } from "@/types/quizType";
import { QuizContentEdit } from "./QuizContentEdit";

interface QuizEditProps {
  quiz: TInputComponentDesign;
}
export const QuizEdit = ({ quiz }: QuizEditProps) => {
  return (
    <div>
      <div>{quiz.id}</div>
      <div>{quiz.type}</div>
      <QuizContentEdit content={quiz.content} />
      <div>{quiz.answer}</div>
    </div>
  );
};
