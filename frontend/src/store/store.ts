import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import notificationReducer from "./slices/notificationSlice";
import noteReducer from "./slices/noteSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      notification: notificationReducer,
      note: noteReducer,
    },
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
