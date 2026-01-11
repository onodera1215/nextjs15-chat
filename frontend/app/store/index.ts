"use client";

import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { entitySlice } from "./entity/entitySlice";
import store from "./index";

export default configureStore({
  reducer: {
    entityReducer: entitySlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
