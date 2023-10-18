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
  update: (id: string, params: any) => axiosClient.put(`memo/${id}`, params), // params はtitle かdescription
};

export default memoApi;
