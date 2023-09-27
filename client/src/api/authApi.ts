import axiosClient from './axiosClient';

// ユーザー登録用の型を定義
interface userInt {
  username: string;
  password: string;
  confirmPassword: string;
}

const authApi = {
  register: (params: userInt) => axiosClient.post('auth/register', params),
};

export default authApi;
