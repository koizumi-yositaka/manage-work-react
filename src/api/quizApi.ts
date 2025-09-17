import axiosInstance from "@/utils/apiQuizClient";
import type { TPageDesign } from "@/types/quizType";
import type { AxiosResponse } from "axios";

type QuizResponse = {
    fileKey: string;
}

type QuizSituationList = {
    result: QuizSituation[];
}

type QuizSituation = {
    quizId: string;
    quizName: string;
    authorId: string;
    quizCreatedAt: string;
    quizResponseSituations: QuizResponseSituation[];
}

type QuizResponseSituation = {
    respondentEmail: string;
    version: number;
    score: number;
    responseCreatedAt: string;
}

type UploadQuizSourceResponse = {
    message: string;
    key: string;
}


export const quizApi = {
    createQuiz: async (userId: string, quizName: string, pageDesign: TPageDesign[], accessToken: string) => {
        const response: AxiosResponse<QuizResponse> = await axiosInstance.post(`/createQuiz`, { userId, quizName, pageDesign }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    },
    uploadQuizSource: async (file: File | Blob, accessToken: string) => {
        const formData = new FormData();
        formData.append('file', file);
        const response: AxiosResponse<UploadQuizSourceResponse> = await axiosInstance.post(`/uploadQuizSrc`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' , Authorization: `Bearer ${accessToken}`},
        });
        return response.data;
    },
    getSituation: async (accessToken: string) => {
        const response: AxiosResponse<QuizSituationList> = await axiosInstance.get(`/getSituation`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    },
    distributeQuiz: async (accessToken: string, quizId: string, emailList: string[]) => {
        const response: AxiosResponse<QuizResponse> = await axiosInstance.post(`/distribute`, { quizId, targets: emailList }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
};