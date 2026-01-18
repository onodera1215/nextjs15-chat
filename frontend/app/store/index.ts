"use client";

import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/entity/users-slice";
import { meSlice } from "./slices/entity/me-slice";
import { roomsSlice } from "./slices/entity/rooms-slice";
import { messagesSlice } from "./slices/entity/messages-slice";
import store from "./index";

export default configureStore({
  reducer: {
    meReducer: meSlice.reducer,
    usersReducer: usersSlice.reducer,
    roomsReducer: roomsSlice.reducer,
    messagesReducer: messagesSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
