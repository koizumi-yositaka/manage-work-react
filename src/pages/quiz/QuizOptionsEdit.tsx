import type { TRadioOption } from "@/types/quizType";

interface QuizOptionsEditProps {
  options: TRadioOption[];
}
export const QuizOptionsEdit = ({ options }: QuizOptionsEditProps) => {
  return (
    <div>
      <div>
        {options.map((option) => (
          <QuizOptionEditItem key={option.id} option={option} />
        ))}
      </div>
    </div>
  );
};

const QuizOptionEditItem = ({ option }: { option: TRadioOption }) => {
  return (
    <div>
      <div>{option.label}</div>
      <div>{option.value}</div>
    </div>
  );
};
