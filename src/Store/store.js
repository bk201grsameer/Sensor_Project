import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../Slices/authSlice';
import { sensorDataSlice } from '../Slices/sensorDataSlice';
import { notificationSlice } from '../Slices/notificationSlice';

export const store = configureStore({
    reducer: {
        authState: authSlice.reducer,
        sensorState: sensorDataSlice.reducer,
        notificationState: notificationSlice.reducer
    },
});