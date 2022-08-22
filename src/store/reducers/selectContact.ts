import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { UserType } from 'types';

interface CounterState {
  contact: UserType | null;
}

const initialState: CounterState = {
  contact: null,
};

export const selectContactSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectContact: (state, action: PayloadAction<UserType | null>) => {
      state.contact = action.payload;
    },
  },
});

export const { setSelectContact } = selectContactSlice.actions;
export const selectUser = (state: RootState) => state.selectContact.contact;
export default selectContactSlice.reducer;
