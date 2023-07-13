import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        pagestate: true,
        user: ''
    },
    reducers: {
        setPageState: (state, action) => {
            state.pagestate = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setPageState, setUser } = authSlice.actions;