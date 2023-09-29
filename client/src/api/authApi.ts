import axiosClient from './axiosClient';

// ユーザー登録用の型を定義
interface userInt {
  username: string;
  password: string;
  confirmPassword: string;
}
interface loginUserInt {
  username: string;
  password: string;
}
const authApi = {
  register: (params: userInt) => axiosClient.post('auth/register', params),
  login: (params: loginUserInt) => axiosClient.post('auth/login', params),
  verifyToken: () => axiosClient.post('auth/verify-token'),
};

export default authApi;
