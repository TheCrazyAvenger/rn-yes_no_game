import {authApi, reportApi, yesnoApi} from '@api';
import {configureStore} from '@reduxjs/toolkit';
import actionsSlice from './slices/actionsSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    [yesnoApi.reducerPath]: yesnoApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    actions: actionsSlice,
    user: userSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(yesnoApi.middleware, authApi.middleware, reportApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
