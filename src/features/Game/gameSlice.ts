import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarkType } from "../PickMark/PickMark";
import { v4 } from "uuid";

export interface CellType {
  val: MarkType | null;
  id: string;
}

interface PlayerType {
  mark: MarkType;
  score: number;
}
export interface GameStateType {
  user: PlayerType;
  CPU: PlayerType;
  currMark: MarkType;
  gridGame: CellType[];
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
      gridGame: Array.from({ length: 9 }, () => ({ id: v4(), val: null })),
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
    addMark: (
      state: GameStateType,
      action: PayloadAction<{ id: string; mark: MarkType }>
    ) => {
      const { id, mark } = action.payload;

      const cell = state.gridGame.findIndex(
        (el) => el.id === id && typeof el.val === "object"
      );
      if (cell !== -1) state.gridGame[cell].val = mark;
      state.currMark = state.currMark === "X" ? "0" : "X";
    },
  },
});

export const { setCurrMark, setUserMark, addMark } = gameSlice.actions;
export default gameSlice.reducer;
