/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  state: false,
};

export const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    toggleSpinnerState(state, action: PayloadAction<any>) {
      state.state = action.payload;
    },

  },
});

export const {
  toggleSpinnerState,
} = spinnerSlice.actions;

export default spinnerSlice;
