import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarkType } from "../PickMark/PickMark";
import { v4 } from "uuid";

interface CellType {
  val: MarkType | null;
  id: string;
}

interface GridGameState {
  gridGame: CellType[];
}

const savedData = sessionStorage.getItem("gridGame");
const initState: GridGameState = {
  gridGame: savedData
    ? JSON.parse(savedData)
    : Array.from({ length: 9 }, () => ({ id: v4(), val: null })),
};

const gridGameSlice = createSlice({
  name: "gridGame",
  initialState: initState,
  reducers: {},
});

export default gridGameSlice.reducer;
