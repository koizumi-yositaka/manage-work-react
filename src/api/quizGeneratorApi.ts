import axiosInstance from "@/utils/apiClientAI";
import type { TPageDesign } from "@/types/quizType";
import type { AxiosResponse } from "axios";



export const quizGeneratorApi = {
    generateQuiz: async (key: string, num_questions: number) => {
        const response: AxiosResponse<TPageDesign[]> = await axiosInstance.post(`/generateQuiz`, { key, num_questions });
        return response.data;
    }
};