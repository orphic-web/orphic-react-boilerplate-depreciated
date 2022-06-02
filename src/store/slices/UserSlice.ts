/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SupportedLanguages from '../../models/enums/SupportedLanguages';

const initialState = {
  firebaseUser: null,
  language: SupportedLanguages.DEFAULT,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateFirebaseUser(state, action: PayloadAction<any>) {
      state.firebaseUser = action.payload;
    },
    updateLanguage(state, action: PayloadAction<any>) {
      state.language = action.payload;
    },
  },
});

export const {
  updateFirebaseUser,
  updateLanguage,
} = userSlice.actions;

export default userSlice;
