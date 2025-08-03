import axios from "axios";

const env = import.meta.env.MODE;


export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  permissions: string[];
}
export interface LoginPayload {
  username: string;
  password: string;
};

export interface LoginResponse {
  token: string;
  user: User
};

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  if (env === "development") {
    // 開発環境: POST to local port
    const res = await axios.post("http://localhost:9100/login", payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  }
  throw new Error(`Unknown environment: ${env}`);
};