import axiosInstance from "@/utils/apiClient";
import type { AxiosResponse } from "axios";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    idToken: string;
    expiresIn: number;
}

export const mwlogin = async (data: LoginRequest) => {
  const response = await axiosInstance.post<LoginResponse>("/mwLogin", data);
  return response.data;
};

export interface UserAttribute {
    sub: string,
    email: string,
    username: string,
    tokenUse: string,
    roles: string,
    permissions: string,
    userStatus: string,
    enabled: boolean,
    userCreateDate: string,
    userLastModifiedDate: string
}

export interface UserInfoResponse {
    message: string;
    user: UserAttribute;
}

//mwGetUser
export const getUserInfo = async (accessToken: string ) => {
    const response = await axiosInstance.get<UserInfoResponse>("/getUser", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
}

export const sendEmail = async (accessToken: string, quizId: string, toAddresses: string[]) => {
    const sendEmailRequest = {
        toAddresses,
        subject:"QuizのURLが配布されました",
        bodyHtml: `QuizのURLが配布されました。<a href='https://quiz-distributor.dev.yositaka-test.com/login?preQuizId=${quizId}'>QuizのURL</a>`
    }
    const response: AxiosResponse<Record<string, string>> = await axiosInstance.post(`/sendEmail`, sendEmailRequest, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
}