import { configureStore } from "@reduxjs/toolkit";
import { UserInfoReducer } from "./reducer/userinfo";
import { EventReducer } from "./reducer/event";

const store = configureStore({
    reducer: {
        userInfoState: UserInfoReducer,
        eventState: EventReducer,
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
