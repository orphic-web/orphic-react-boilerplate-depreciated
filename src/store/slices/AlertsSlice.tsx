/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    queue: [] as any[],
};

export const alertsSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        createAlert(state, action: PayloadAction<any>) {
            state.queue = [...state.queue, action.payload];
        },
        removeAlert(state, action: PayloadAction<any>) {
            state.queue = state.queue.filter((alert) => alert.id !== action.payload);
        },
        dismissAlert(state, action: PayloadAction<any>) {
            const queueTemp = state.queue.filter((alert) => alert.id !== action.payload);

            const alertsTemp = state.queue.filter((alert) => alert.id === action.payload);
            const alertTemp = alertsTemp[0];
            if (alertTemp) {
                alertTemp.dismiss = true;
                state.queue = [...queueTemp, alertTemp];
            }
        },
    },
});

export const {
    createAlert,
    removeAlert,
    dismissAlert,
} = alertsSlice.actions;

export default alertsSlice;