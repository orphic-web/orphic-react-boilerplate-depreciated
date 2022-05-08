/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  show: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    updateShow(state, action: PayloadAction<any>) {
      state.show = action.payload;
    },

  },
});

export const {
  updateShow,
} = loaderSlice.actions;

export default loaderSlice;
