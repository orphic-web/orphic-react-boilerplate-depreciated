/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
  },
});

export const {
  updateUser,
} = userSlice.actions;

export default userSlice;