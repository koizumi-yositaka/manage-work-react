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
    console.log("accessToken", accessToken);
    const response = await axiosInstance.get<UserInfoResponse>("/getUser", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
}