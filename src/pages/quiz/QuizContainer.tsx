import type { TPageDesign } from "@/types/quizType";
import QuizPresentation from "./QuizPresentation";

export const QuizContainer = () => {
  const pageDesigns: TPageDesign[] = [
    {
      pageId: "1",
      components: [
        {
          id: "tesAAAA",
          type: "radio",
          answer: "test1",
          content: {
            q: "test",
            qIndex: 1,
            name: "tesAAAA",
            options: [
              { id: "1", label: "test1", value: "test1" },
              { id: "2", label: "test2", value: "test2" },
              { id: "3", label: "test3", value: "test3" },
            ],
            requiredMessage: "この項目は必須です",
          },
        },
        {
          id: "testBBBB",
          type: "radio",
          answer: "test2",
          content: {
            q: "test",
            qIndex: 2,
            name: "testBBBB",
            options: [
              { id: "1", label: "test1", value: "test1" },
              { id: "2", label: "test2", value: "test2" },
              { id: "3", label: "test3", value: "test3" },
            ],
            requiredMessage: "この項目は必須です",
          },
        },
      ],
    },
    {
      pageId: "4",
      components: [
        {
          id: "tesAAAAVVVAA",
          type: "radio",
          answer: "test3",
          content: {
            q: "test",
            qIndex: 3,
            name: "tesAAAAVVVAA",
            options: [
              { id: "1", label: "test1", value: "test1" },
              { id: "2", label: "test2", value: "test2" },
              { id: "3", label: "test3", value: "test3" },
            ],
            requiredMessage: "",
          },
        },
        {
          id: "testRRRRBBBB",
          type: "radio",
          answer: "test4",
          content: {
            q: "test",
            qIndex: 4,
            name: "testRRRRBBBB",
            options: [
              { id: "1", label: "test1", value: "test1" },
              { id: "2", label: "test2", value: "test2" },
              { id: "3", label: "test3", value: "test3" },
            ],
            requiredMessage: "この項目は必須です",
          },
        },
      ],
    },
  ];
  return <QuizPresentation pageDesigns={pageDesigns} />;
};
