import { createSlice } from "@reduxjs/toolkit";

export interface IEvent {
    _id: string;
    userId: string;
    name: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    createdAt?: Date;
    updatedAt?: Date;
    wsId?: string;
}

export const initialState: IEvent[] = [];

export const EventSlice = createSlice({
    name: "userInfoState",
    initialState: initialState,
    reducers: {
        addEvent: (state, action) => {
            return [...action.payload];
        },
        editOneEvent: (state, action) => {
            let newState = [...state];
            const findEventIndex = state.findIndex((e) => e._id === action.payload._id);
            if (findEventIndex > -1) {
                newState.splice(findEventIndex, 1, action.payload);
                return newState;
            }
        },
        deleteEvent: (state, action) => {
            let newState = [...state];
            const findEventIndex = state.findIndex((e) => e._id === action.payload);
            if (findEventIndex > -1) {
                newState.splice(findEventIndex, 1);
                return newState;
            }
        },
        updateEvent: (state, action) => {
            console.log("actionpayload: ", action.payload);

            const newState = [...action.payload];
            return newState;
        },
    },
});

export const { addEvent, editOneEvent, deleteEvent, updateEvent } = EventSlice.actions;

export const EventReducer = EventSlice.reducer;
