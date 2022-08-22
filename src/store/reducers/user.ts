import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { UserType } from 'types';

interface CounterState {
  user: UserType | null;
}

const initialState: CounterState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.userReducer.user;
export default userSlice.reducer;
