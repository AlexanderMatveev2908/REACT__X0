import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Home/authSLice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
