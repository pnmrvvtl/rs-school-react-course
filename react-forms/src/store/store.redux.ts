//libs
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
//slices
import { searchReducer, productsReducer } from './slices';
//rtk api
import { mealsApi } from '../api/meals.rtk-api';

const store = configureStore({
  reducer: {
    search: searchReducer,
    products: productsReducer,
    [mealsApi.reducerPath]: mealsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mealsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
