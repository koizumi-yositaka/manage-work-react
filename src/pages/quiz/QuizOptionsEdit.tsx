import { useState } from "react";
import type { TRadioOption } from "@/types/quizType";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface QuizOptionsEditProps {
  options: TRadioOption[];
  isEditing: boolean;
  onOptionsChange: (newOptions: TRadioOption[]) => void;
}

export const QuizOptionsEdit = ({ options, isEditing, onOptionsChange }: QuizOptionsEditProps) => {
  const [editingOptionId, setEditingOptionId] = useState<string | null>(null);

  const handleOptionChange = (optionId: string, field: 'label' | 'value', newValue: string) => {
    const newOptions = options.map(option => 
      option.id === optionId 
        ? { ...option, [field]: newValue }
        : option
    );
    onOptionsChange(newOptions);
  };

  const handleAddOption = () => {
    const newOption: TRadioOption = {
      id: `option_${Date.now()}`,
      label: "新しい選択肢",
      value: "new_option"
    };
    onOptionsChange([...options, newOption]);
  };

  const handleRemoveOption = (optionId: string) => {
    const newOptions = options.filter(option => option.id !== optionId);
    onOptionsChange(newOptions);
  };

  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <QuizOptionEditItem 
          key={option.id} 
          option={option} 
          index={index + 1}
          isEditing={isEditing}
          isEditingThisOption={editingOptionId === option.id}
          onStartEdit={() => setEditingOptionId(option.id)}
          onStopEdit={() => setEditingOptionId(null)}
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
  isEditingThisOption: boolean;
  onStartEdit: () => void;
  onStopEdit: () => void;
  onOptionChange: (optionId: string, field: 'label' | 'value', newValue: string) => void;
  onRemoveOption: (optionId: string) => void;
}

const QuizOptionEditItem = ({ 
  option, 
  index, 
  isEditing, 
  isEditingThisOption,
  onStartEdit,
  onStopEdit,
  onOptionChange,
  onRemoveOption
}: QuizOptionEditItemProps) => {
  const [tempLabel, setTempLabel] = useState(option.label);
  const [tempValue, setTempValue] = useState(option.value);

  const handleSave = () => {
    onOptionChange(option.id, 'label', tempLabel);
    onOptionChange(option.id, 'value', tempValue);
    onStopEdit();
  };

  const handleCancel = () => {
    setTempLabel(option.label);
    setTempValue(option.value);
    onStopEdit();
  };

  return (
    <div className="flex items-center space-x-4 p-3 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
        {index}
      </div>
      
      <div className="flex-1 space-y-2">
        {isEditing && isEditingThisOption ? (
          <div className="space-y-2">
            <div>
              <label className="text-xs text-gray-600">ラベル:</label>
              <Input
                value={tempLabel}
                onChange={(e) => setTempLabel(e.target.value)}
                className="text-sm"
                placeholder="選択肢のラベル"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">値:</label>
              <Input
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="text-sm font-mono"
                placeholder="選択肢の値"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                保存
              </Button>
              <Button onClick={handleCancel} size="sm" variant="outline">
                キャンセル
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-gray-800 font-medium">{option.label}</div>
            <div className="text-sm text-gray-500 font-mono">値: {option.value}</div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-end space-y-1">
        <div className="text-xs text-gray-400">
          ID: {option.id}
        </div>
        {isEditing && (
          <div className="flex space-x-1">
            {!isEditingThisOption ? (
              <Button 
                onClick={onStartEdit}
                size="sm" 
                variant="outline"
                className="text-xs px-2 py-1"
              >
                編集
              </Button>
            ) : null}
            <Button 
              onClick={() => onRemoveOption(option.id)}
              size="sm" 
              variant="outline"
              className="text-xs px-2 py-1 text-red-600 border-red-300 hover:bg-red-50"
            >
              削除
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
