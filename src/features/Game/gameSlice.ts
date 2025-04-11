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
  hasMoved: boolean;
}
export interface GameStateType {
  user: PlayerType;
  CPU: PlayerType;
  currMark: MarkType;
  gridGame: CellType[];
  isPending: boolean;
}

const savedData = sessionStorage.getItem("gameState");
const initState: GameStateType = savedData
  ? JSON.parse(savedData)
  : {
      user: {
        mark: "0",
        score: 0,
        hasMoved: true,
      },
      CPU: {
        mark: "X",
        score: 0,
        hasMoved: false,
      },
      currMark: "X",
      gridGame: Array.from({ length: 9 }, () => ({ id: v4(), val: null })),
      isPending: false,
    };

const gameSlice = createSlice({
  name: "game",
  initialState: initState,
  reducers: {
    setUserMark: (state: GameStateType, action: PayloadAction<MarkType>) => {
      state.user.mark = action.payload;
      state.CPU.mark = action.payload === "X" ? "0" : "X";

      state.user.hasMoved = action.payload === "0";
      state.CPU.hasMoved = action.payload === "X";

      state.isPending = action.payload === "0";
    },
    addMark: (state: GameStateType, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      const cell = state.gridGame.findIndex(
        (el) => el.id === id && typeof el.val === "object"
      );
      if (cell !== -1) state.gridGame[cell].val = state.currMark;

      state.isPending = state.CPU.mark !== state.currMark;

      state.user.hasMoved = state.user.mark === state.currMark;
      state.CPU.hasMoved = state.CPU.mark === state.currMark;

      state.currMark = state.currMark === "X" ? "0" : "X";
    },
    refresh: (state, action: PayloadAction<string[]>) => {
      state.gridGame = Array.from({ length: 9 }, (_, i) => ({
        id: action.payload[i],
        val: null,
      }));
      state.isPending = state.CPU.mark === "X";
      state.CPU.hasMoved = state.CPU.mark === "0";
      state.user.hasMoved = state.CPU.mark === "X";
      state.currMark = "X";
    },
    partialRefreshStart: (state, action: PayloadAction<string[]>) => {
      state.gridGame = Array.from({ length: 9 }, (_, i) => ({
        id: action.payload[i],
        val: null,
      }));
      state.isPending = false;
      state.CPU.hasMoved = true;
      state.user.hasMoved = true;
      state.currMark = "X";
    },
    partialRefreshEnd: (state) => {
      state.isPending = state.CPU.mark === "X";
      state.CPU.hasMoved = state.CPU.mark === "0";
    },
  },
});

export const {
  setUserMark,
  addMark,
  refresh,
  partialRefreshStart,
  partialRefreshEnd,
} = gameSlice.actions;
export default gameSlice.reducer;
