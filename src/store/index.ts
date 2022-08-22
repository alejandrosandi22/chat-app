import { configureStore } from '@reduxjs/toolkit';
import selectContact from './reducers/selectContact';
import userReducer from './reducers/user';

export const store = configureStore({
  reducer: {
    selectContact,
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
