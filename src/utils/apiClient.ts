import Axios from "axios";
const axiosInstance = Axios.create({ 
    baseURL: import.meta.env.VITE_AUTH_ENDPOINT,  
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 60000,
});

// リクエスト時の共通処理
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

// レスポンス時の共通処理
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('[Response Error]', error.response ? error.response.data : error);
    return Promise.reject(error);
  }
);

export default axiosInstance;