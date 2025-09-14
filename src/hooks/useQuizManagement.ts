import { useState, useCallback } from "react";
import type { TPageDesign, TInputComponentDesign } from "@/types/quizType";

interface ValidationError {
  type: 'quiz_id_duplicate' | 'empty_options' | 'empty_page' | 'empty_field_name';
  message: string;
  pageId?: string;
  quizId?: string;
  quizFieldName?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

interface UseQuizManagementReturn {
  pageDesigns: TPageDesign[];
  updateQuiz: (pageId: string, componentId: string, updatedQuiz: TInputComponentDesign) => void;
  addQuiz: (pageId: string, newQuiz: TInputComponentDesign) => void;
  deleteQuiz: (pageId: string, componentId: string) => void;
  addPage: (newPage: TPageDesign) => void;
  deletePage: (pageId: string) => void;
  updatePageId: (oldPageId: string, newPageId: string) => void;
  resetToMinimal: () => void;
  resetToTemplate: () => void;
  moveQuizUp: (pageId: string, componentId: string) => void;
  moveQuizDown: (pageId: string, componentId: string) => void;
  validateData: () => ValidationResult;
}

export const useQuizManagement = (initialData: TPageDesign[]): UseQuizManagementReturn => {
  const [pageDesigns, setPageDesigns] = useState<TPageDesign[]>(initialData);

  const updateQuiz = useCallback((pageId: string, componentId: string, updatedQuiz: TInputComponentDesign) => {
    setPageDesigns(prev => 
      prev.map(page => 
        page.pageId === pageId 
          ? {
              ...page,
              components: page.components.map(component =>
                component.id === componentId ? updatedQuiz : component
              )
            }
          : page
      )
    );
  }, []);

  const addQuiz = useCallback((pageId: string, newQuiz: TInputComponentDesign) => {
    setPageDesigns(prev =>
      prev.map(page =>
        page.pageId === pageId
          ? {
              ...page,
              components: [...page.components, {
                ...newQuiz,
                id: `${pageId}_${page.components.length + 1}`,
                content: {
                  ...newQuiz.content,
                  qIndex: page.components.length + 1
                }
              }]
            }
          : page
      )
    );
  }, []);

  const deleteQuiz = useCallback((pageId: string, componentId: string) => {
    setPageDesigns(prev =>
      prev.map(page =>
        page.pageId === pageId
          ? {
              ...page,
              components: page.components
                .filter(component => component.id !== componentId)
                .map((component, index) => ({
                  ...component,
                  id: `${pageId}_${index + 1}`,
                  content: {
                    ...component.content,
                    qIndex: index + 1
                  }
                }))
            }
          : page
      )
    );
  }, []);

  const addPage = useCallback((newPage: TPageDesign) => {
    setPageDesigns(prev => [...prev, newPage]);
  }, []);

  const deletePage = useCallback((pageId: string) => {
    setPageDesigns(prev => prev.filter(page => page.pageId !== pageId));
  }, []);

  const updatePageId = useCallback((oldPageId: string, newPageId: string) => {
    setPageDesigns(prev =>
      prev.map(page =>
        page.pageId === oldPageId
          ? {
              ...page,
              pageId: newPageId,
              components: page.components.map(component => ({
                ...component,
                id: `${newPageId}_${component.content.qIndex}`
              }))
            }
          : page
      )
    );
  }, []);

  const resetToMinimal = useCallback(() => {
    const minimalData: TPageDesign[] = [
      {
        pageId: "page_1",
        components: [
          {
            id: "page_1_1",
            type: "radio",
            answer: "",
            content: {
              q: "新しい質問",
              qIndex: 1,
              name: "new_question",
              options: [
                { label: "選択肢1", value: "option1" },
                { label: "選択肢2", value: "option2" },
              ],
              requiredMessage: "",
            },
          },
        ],
      },
    ];
    setPageDesigns(minimalData);
  }, []);

  const resetToTemplate = useCallback(() => {
    setPageDesigns(initialData);
  }, [initialData]);

  const moveQuizUp = useCallback((pageId: string, componentId: string) => {
    setPageDesigns(prev =>
      prev.map(page =>
        page.pageId === pageId
          ? {
              ...page,
              components: (() => {
                const components = [...page.components];
                const currentIndex = components.findIndex(comp => comp.id === componentId);
                if (currentIndex > 0) {
                  // 要素を交換
                  [components[currentIndex - 1], components[currentIndex]] = 
                  [components[currentIndex], components[currentIndex - 1]];
                  // IDとqIndexを再採番
                  return components.map((comp, index) => ({
                    ...comp,
                    id: `${pageId}_${index + 1}`,
                    content: {
                      ...comp.content,
                      qIndex: index + 1
                    }
                  }));
                }
                return components;
              })()
            }
          : page
      )
    );
  }, []);

  const moveQuizDown = useCallback((pageId: string, componentId: string) => {
    setPageDesigns(prev =>
      prev.map(page =>
        page.pageId === pageId
          ? {
              ...page,
              components: (() => {
                const components = [...page.components];
                const currentIndex = components.findIndex(comp => comp.id === componentId);
                if (currentIndex < components.length - 1) {
                  // 要素を交換
                  [components[currentIndex], components[currentIndex + 1]] = 
                  [components[currentIndex + 1], components[currentIndex]];
                  // IDとqIndexを再採番
                  return components.map((comp, index) => ({
                    ...comp,
                    id: `${pageId}_${index + 1}`,
                    content: {
                      ...comp.content,
                      qIndex: index + 1
                    }
                  }));
                }
                return components;
              })()
            }
          : page
      )
    );
  }, []);

  const validateData = useCallback((): ValidationResult => {
    const errors: ValidationError[] = [];
    
    // 1. フィールド名が空でないかチェック
    pageDesigns.forEach(page => {
      page.components.forEach(quiz => {
        if (!quiz.content.name || quiz.content.name.trim() === '') {
          errors.push({
            type: 'empty_field_name',
            message: `フィールド名が空です`,
            pageId: page.pageId,
            quizId: quiz.id,
            quizFieldName: quiz.content.name
          });
        }
      });
    });
    
    // 2. 質問のIDが重複していないかチェック
    const allQuizIds = new Set<string>();
    pageDesigns.forEach(page => {
      page.components.forEach(quiz => {
        if (allQuizIds.has(quiz.id)) {
          errors.push({
            type: 'quiz_id_duplicate',
            message: `フィールド名 "${quiz.content.name}" が重複しています`,
            quizId: quiz.id,
            quizFieldName: quiz.content.name
          });
        } else {
          allQuizIds.add(quiz.id);
        }
      });
    });

    // 3. 選択肢が空の質問がないかチェック
    pageDesigns.forEach(page => {
      page.components.forEach(quiz => {
        if (quiz.content.options.length === 0) {
          errors.push({
            type: 'empty_options',
            message: `フィールド "${quiz.content.name}" に選択肢がありません`,
            pageId: page.pageId,
            quizId: quiz.id,
            quizFieldName: quiz.content.name
          });
        }
      });
    });

    // 4. 質問が存在しないページがないかチェック
    pageDesigns.forEach(page => {
      if (page.components.length === 0) {
        errors.push({
          type: 'empty_page',
          message: `ページ "${page.pageId}" に質問がありません`,
          pageId: page.pageId
        });
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }, [pageDesigns]);

  return {
    pageDesigns,
    updateQuiz,
    addQuiz,
    deleteQuiz,
    addPage,
    deletePage,
    updatePageId,
    resetToMinimal,
    resetToTemplate,
    moveQuizUp,
    moveQuizDown,
    validateData
  };
};
