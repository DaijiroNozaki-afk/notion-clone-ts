import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export const useAddDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
