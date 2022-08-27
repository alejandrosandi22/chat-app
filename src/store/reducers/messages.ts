import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dateFormat from 'services/dateFormat';
import { MessageType } from 'types';

interface MessageState {
  messages: MessageType[];
}

const initialState: MessageState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (
      state: MessageState,
      action: PayloadAction<MessageType[]>
    ) => {
      let date = '';

      state.messages = action.payload.map((message: MessageType) => {
        if (action.payload.length === 1) {
          return {
            ...message,
            date: message.created_at,
          };
        }
        if (date !== dateFormat(message.created_at)) {
          date = dateFormat(message.created_at);
          return {
            ...message,
            date: message.created_at,
          };
        }
        return {
          ...message,
          date: null,
        };
      });
    },
  },
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
