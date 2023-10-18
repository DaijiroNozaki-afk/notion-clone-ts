import axiosClient from './axiosClient';

// ユーザー登録用の型を定義
interface userInt {
  username: string;
  //あとで書く
}
// メモ更新用の型を定義
interface updateInt {
  title?: string;
  description?: string;
  // パラメーターが増えたら追加する
}
const memoApi = {
  create: () => axiosClient.post('memo'),
  getAll: () => axiosClient.get('memo'),
  getOne: (id: string) => axiosClient.get(`memo/${id}`),
  update: (id: string, params: updateInt) =>
    axiosClient.put(`memo/${id}`, params),
};

export default memoApi;
