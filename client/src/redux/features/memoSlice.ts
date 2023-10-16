import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 初期状態の型
interface MemoState {
  value: Record<string, any>;
}
const initialState: MemoState = { value: [] };

// Redux スライスを定義
const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    setMemo: (state, action: PayloadAction<string | any>) => {
      state.value = action.payload; // 初期状態のstate に、新しい状態を代入する
    },
  },
});

export const { setMemo } = memoSlice.actions;

export default memoSlice.reducer;
