import { configureStore } from '@reduxjs/toolkit';
import selectContact from './reducers/selectContact';
import userReducer from './reducers/user';
import messagesReducer from 'store/reducers/messages';

export const store = configureStore({
  reducer: {
    selectContact,
    userReducer,
    messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
