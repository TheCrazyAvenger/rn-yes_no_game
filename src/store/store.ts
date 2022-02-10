import {authApi, yesnoApi} from '@api';
import {configureStore} from '@reduxjs/toolkit';
import actionsSlice from './slices/actionsSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    [yesnoApi.reducerPath]: yesnoApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    actions: actionsSlice,
    user: userSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(yesnoApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
