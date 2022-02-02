import {configureStore} from '@reduxjs/toolkit';
import actionsSlice from './slices/actionsSlice';

export const store = configureStore({
  reducer: {
    actions: actionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
