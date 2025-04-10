import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSLice";
import gameReducer from "../features/Game/gameSlice";
import gridGameReducer from "../features/Game/gridGameSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    gridGame: gridGameReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
