import { createSlice } from '@reduxjs/toolkit';

export const UserInfoSlice = createSlice({
    name: 'userInfoState',
    initialState: {},
    reducers: {
        login: (state, action) => {
            state = action.payload;
        },
    },
});

export const { login } = UserInfoSlice.actions;

export const UserInfoReducer = UserInfoSlice.reducer;
