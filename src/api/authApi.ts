import axiosInstance from "@/utils/apiClient";

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
    Name: string;
    Value:string;
}

//mwGetUser
export const getUserInfo = async (accessToken: string ) => {
    const response = await axiosInstance.get<UserAttribute[]>("/mwGetUser", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
}