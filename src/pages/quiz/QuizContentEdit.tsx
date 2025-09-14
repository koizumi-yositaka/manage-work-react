import type { TInputContentDesign } from "@/types/quizType";
import { QuizOptionsEdit } from "./QuizOptionsEdit";

interface QuizContentEditProps {
  content: TInputContentDesign;
}
export const QuizContentEdit = ({ content }: QuizContentEditProps) => {
  return (
    <div>
      <div>{content.q}</div>
      <div>{content.qIndex}</div>
      <div>{content.name}</div>
      <QuizOptionsEdit options={content.options} />
      <div>{content.requiredMessage}</div>
    </div>
  );
};
