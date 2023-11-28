import { createSlice } from "@reduxjs/toolkit";

export interface IWorkspace {
    _id: string;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const initialState: IWorkspace[] = [];

export const workspaceSlice = createSlice({
    name: "workspacestate",
    initialState: initialState,
    reducers: {
        addWorkspace: (state, action) => {
            return [...state, ...action.payload];
        },
        editWorkspace: (state, action) => {
            let newState = [...state];
            const findWsIndex = state.findIndex((e) => e._id === action.payload._id);
            if (findWsIndex > -1) {
                newState.splice(findWsIndex, 1, action.payload);
                return newState;
            }
        },
        deleteWorkspace: (state, action) => {
            let newState = [...state];
            const findWorkspaceIndex = state.findIndex((e) => e._id === action.payload);
            if (findWorkspaceIndex > -1) {
                newState.splice(findWorkspaceIndex, 1);
                return newState;
            }
        },
    },
});

export const { addWorkspace, editWorkspace, deleteWorkspace } = workspaceSlice.actions;

export const WorkspaceReducer = workspaceSlice.reducer;
