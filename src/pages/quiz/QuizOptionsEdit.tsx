import type { TRadioOption } from "@/types/quizType";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface QuizOptionsEditProps {
  options: TRadioOption[];
  isEditing: boolean;
  onOptionsChange: (newOptions: TRadioOption[]) => void;
}

export const QuizOptionsEdit = ({ options, isEditing, onOptionsChange }: QuizOptionsEditProps) => {
  const handleOptionChange = (index: number, field: 'label' | 'value', newValue: string) => {
    const newOptions = options.map((option, i) => 
      i === index 
        ? { ...option, [field]: newValue }
        : option
    );
    onOptionsChange(newOptions);
  };

  const handleAddOption = () => {
    const newOption: TRadioOption = {
      label: "新しい選択肢",
      value: "new_option"
    };
    onOptionsChange([...options, newOption]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    onOptionsChange(newOptions);
  };

  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <QuizOptionEditItem 
          key={index} 
          option={option} 
          index={index + 1}
          isEditing={isEditing}
          onOptionChange={handleOptionChange}
          onRemoveOption={handleRemoveOption}
        />
      ))}
      {isEditing && (
        <Button 
          onClick={handleAddOption}
          variant="outline"
          size="sm"
          className="w-full border-dashed border-gray-300 text-gray-600 hover:border-gray-400"
        >
          + 選択肢を追加
        </Button>
      )}
    </div>
  );
};

interface QuizOptionEditItemProps {
  option: TRadioOption;
  index: number;
  isEditing: boolean;
  onOptionChange: (index: number, field: 'label' | 'value', newValue: string) => void;
  onRemoveOption: (index: number) => void;
}

const QuizOptionEditItem = ({ 
  option, 
  index, 
  isEditing, 
  onOptionChange,
  onRemoveOption
}: QuizOptionEditItemProps) => {

  return (
    <div className="flex items-center space-x-4 p-3 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
        {index}
      </div>
      
      <div className="flex-1 space-y-2">
        {isEditing ? (
          <div className="space-y-2">
            <div>
              <label className="text-xs text-gray-600">ラベル:</label>
              <Input
                value={option.label}
                onChange={(e) => onOptionChange(index - 1, 'label', e.target.value)}
                className="text-sm"
                placeholder="選択肢のラベル"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">値:</label>
              <Input
                value={option.value}
                onChange={(e) => onOptionChange(index - 1, 'value', e.target.value)}
                className="text-sm font-mono"
                placeholder="選択肢の値"
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="text-gray-800 font-medium">{option.label}</div>
            <div className="text-sm text-gray-500 font-mono">値: {option.value}</div>
          </div>
        )}
      </div>
      
      {isEditing && (
        <div className="flex space-x-1">
          <Button 
            onClick={() => onRemoveOption(index - 1)}
            size="sm" 
            variant="outline"
            className="text-xs px-2 py-1 text-red-600 border-red-300 hover:bg-red-50"
          >
            削除
          </Button>
        </div>
      )}
    </div>
  );
};
