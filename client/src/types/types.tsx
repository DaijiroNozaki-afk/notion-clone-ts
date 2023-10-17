// リクエストボディの型を定義
export interface RegisterRequest {
  username: string;
  password: string;
  // 他の必要なフィールドをここに追加
}

// user リクエスト の型を定義
export interface UserRequest {
  _id: string; // 例: '650d069d67ef2b6c5578a46b'
  username: string; // 例: 'notionUser2'
  password: string; // 例: 'U2FsdGVkX18QnLnBMVbtD98b6ktTpCJ+a+RmqNhX12k='
  __v: number; // 例: 0
}

// user の型を定義
export interface IUser {
  username: string;
  password: string;
  _id: string;
}
// memo の型を定義
export interface MemoType {
  _id: string; //本当はObjectId型?
  user: string;
  icon: string;
  title: string;
  description: string;
  position: number;
  favorite: boolean;
  favoritePosition: number;
}
