import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// リクエストの前処理
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    //リクエストヘッダーにトークンを追加するなどの前処理を行う
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Content-Type'] = 'application/json';
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// レスポンスの前処理
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // レスポンスを加工したり、エラーハンドリングを行うことができます
    return response;
  },
  (error) => {
    //エラーレスポンスをハンドリングすることができます
    return Promise.reject(error);
  }
);
export default axiosClient;
