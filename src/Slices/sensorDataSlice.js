import { createSlice } from '@reduxjs/toolkit'

export const sensorDataSlice = createSlice({
    name: 'sensor',
    initialState: {
        distance: 0
    },
    reducers: {
        setDistanceState: (state, action) => {
            state.distance = action.payload
        }
    }
})

export const { setDistanceState } = sensorDataSlice.actions