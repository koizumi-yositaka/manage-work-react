import type { TPageDesign } from "@/types/quizType";
import { QuizEdit } from "./QuizEdit";

interface QuizPresentationProps {
  pageDesigns: TPageDesign[];
}

const QuizPresentation = ({ pageDesigns }: QuizPresentationProps) => {
  return (
    <div>
      {pageDesigns.map((pageDesign) => (
        <div key={pageDesign.pageId}>
          <div>{pageDesign.pageId}</div>
          {pageDesign.components.map((component) => (
            <QuizEdit key={component.id} quiz={component} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuizPresentation;
