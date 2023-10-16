import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import memoReducer from './features/memoSlice';
import { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
export const store = configureStore({
  reducer: {
    user: userReducer,
    memo: memoReducer,
  },
});
export const useAddDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
