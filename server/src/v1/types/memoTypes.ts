// リクエストボディの型を定義
export interface MemoRequest {
  _id: string;
  user: string;
  icon: string;
  title: string;
  description: string;
  position: number;
  favorite: string;
  favoritePosition: number;
  // 他の必要なフィールドをここに追加
}
