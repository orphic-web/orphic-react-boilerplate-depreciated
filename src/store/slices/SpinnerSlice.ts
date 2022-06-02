/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  show: false,
};

export const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    toggleSpinner(state, action: PayloadAction<any>) {
      state.show = action.payload;
    },
  },
});

export const {
  toggleSpinner,
} = spinnerSlice.actions;

export default spinnerSlice;
