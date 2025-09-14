import { useState, useCallback } from "react";
import type { TPageDesign, TInputComponentDesign } from "@/types/quizType";

interface UseQuizManagementReturn {
  pageDesigns: TPageDesign[];
  updateQuiz: (pageId: string, componentId: string, updatedQuiz: TInputComponentDesign) => void;
  addQuiz: (pageId: string, newQuiz: TInputComponentDesign) => void;
  deleteQuiz: (pageId: string, componentId: string) => void;
  addPage: (newPage: TPageDesign) => void;
  deletePage: (pageId: string) => void;
  resetToInitial: () => void;
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

  const resetToInitial = useCallback(() => {
    setPageDesigns(initialData);
  }, [initialData]);

  return {
    pageDesigns,
    updateQuiz,
    addQuiz,
    deleteQuiz,
    addPage,
    deletePage,
    resetToInitial
  };
};
