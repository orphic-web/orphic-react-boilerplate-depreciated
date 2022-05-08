/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  firebaseUser: null,
  platform: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    updateFirebaseUser(state, action: PayloadAction<any>) {
      state.firebaseUser = action.payload;
    },
    updatePlatform(state, action: PayloadAction<any>) {
      state.platform = action.payload;
    },
  },
});

export const {
  updateUser,
  updateFirebaseUser,
  updatePlatform,
} = userSlice.actions;

export default userSlice;
