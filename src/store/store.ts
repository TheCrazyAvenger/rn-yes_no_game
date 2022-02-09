import {yesnoApi} from '@api';
import {configureStore} from '@reduxjs/toolkit';
import actionsSlice from './slices/actionsSlice';

export const store = configureStore({
  reducer: {
    [yesnoApi.reducerPath]: yesnoApi.reducer,
    actions: actionsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(yesnoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
