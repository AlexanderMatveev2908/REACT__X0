import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSLice";
import gameReducer from "../features/Game/gameSlice";
import infoReducer from "../features/InfoPop/infoPopSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    infoPop: infoReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
