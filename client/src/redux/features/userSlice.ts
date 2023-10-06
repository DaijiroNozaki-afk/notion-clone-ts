import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 初期状態の型
interface UserState {
  value: Record<string, any>;
}
const initialState: UserState = { value: {} };

// Redux スライスを定義
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | any>) => {
      state.value = action.payload; // 初期状態のstate に、新しい状態を代入する
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

// const initialState = { value: {} };
// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
// });
