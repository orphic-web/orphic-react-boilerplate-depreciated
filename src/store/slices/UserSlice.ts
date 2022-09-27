/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SupportedLanguages from '../../models/enums/SupportedLanguages';

const initialState = {
  user: null,
  language: SupportedLanguages.DEFAULT,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    updateLanguage(state, action: PayloadAction<any>) {
      state.language = action.payload;
    },
  },
});

export const {
  updateUser,
  updateLanguage,
} = userSlice.actions;

export default userSlice;
