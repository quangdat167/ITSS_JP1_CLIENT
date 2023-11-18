import { createSlice } from "@reduxjs/toolkit";

interface IUserInfo {
    _id: any;
    firstName: string;
    lastName: string;
    avatar?: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const initialState = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
};

export const UserInfoSlice = createSlice({
    name: "userInfoState",
    initialState: initialState,
    reducers: {
        loginReducer: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        getUserInfoReducer: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        signOutReducer: (state, action) => {
            return initialState;
        },
    },
});

export const { loginReducer, getUserInfoReducer, signOutReducer } = UserInfoSlice.actions;

export const UserInfoReducer = UserInfoSlice.reducer;
