/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SupportedLanguages from '../../models/enums/SupportedLanguages';
import User from '../../models/User';
import UserService from '../../services/UserService';

const initialState = {
  firebaseUser: null,
  user: null,
  language: SupportedLanguages.EN,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateFirebaseUser(state, action: PayloadAction<any>) {
      state.firebaseUser = action.payload;
    },
    updateUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    updateLanguage(state, action: PayloadAction<any>) {
      state.language = action.payload;
    },
    toggleLanguage(state) {
      if (state.user) {
        const newUser = state.user as User;
        if (newUser.language === SupportedLanguages.FR) newUser.language = SupportedLanguages.EN;
        else newUser.language = SupportedLanguages.FR;
        UserService.update(newUser);
      }
    },
  },
});

export const {
  updateFirebaseUser,
  updateUser,
  updateLanguage,
  toggleLanguage,
} = userSlice.actions;

export default userSlice;
