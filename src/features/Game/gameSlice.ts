import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarkType } from "../PickMark/ButtonsMark/ButtonsMark";

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
  },
});

export const { setCurrMark } = gameSlice.actions;
export default gameSlice.reducer;
