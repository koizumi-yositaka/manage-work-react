import axios from "axios";

const isProd = process.env.NODE_ENV === "production";
const BASE_URL = isProd
  ? "https://example.com/api/aurora"
  : "http://localhost:9001";

export const postAuroraApi = async <TReq, TRes>(
  path: string,
  data: TReq
): Promise<TRes> => {
  const response = await axios.post<TRes>(`${BASE_URL}${path}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};