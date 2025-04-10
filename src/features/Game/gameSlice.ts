import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarkType } from "../PickMark/PickMark";

interface PlayerType {
  mark: MarkType;
  score: number;
}
interface GameStateType {
  user: PlayerType;
  CPU: PlayerType;
  currMark: MarkType;
}

const savedData = sessionStorage.getItem("gameState");
const initState: GameStateType = savedData
  ? JSON.parse(savedData)
  : {
      user: {
        mark: "0",
        score: 0,
      },
      CPU: {
        mark: "X",
        score: 0,
      },
      currMark: "X",
    };

const gameSlice = createSlice({
  name: "game",
  initialState: initState,
  reducers: {
    setCurrMark: (state: GameStateType, action: PayloadAction<MarkType>) => {
      state.currMark = action.payload;
    },
    setUserMark: (state: GameStateType, action: PayloadAction<MarkType>) => {
      state.user.mark = action.payload;
      state.CPU.mark = action.payload === "X" ? "0" : "X";
    },
  },
});

export const { setCurrMark, setUserMark } = gameSlice.actions;
export default gameSlice.reducer;
