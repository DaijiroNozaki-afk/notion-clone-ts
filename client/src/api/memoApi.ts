import axiosClient from './axiosClient';

// ユーザー登録用の型を定義
interface userInt {
  username: string;
  //あとで書く
}
const memoApi = {
  create: () => axiosClient.post('memo'),
  getAll: () => axiosClient.get('memo'),
  getOne: (id: string) => axiosClient.get(`memo/${id}`),
};

export default memoApi;
