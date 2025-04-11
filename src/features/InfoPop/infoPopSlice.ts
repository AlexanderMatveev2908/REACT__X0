import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarkType } from "../PickMark/PickMark";

export interface InfoPopType {
  headTxt: string;
  leftBtn: string;
  rightBtn: string;
  mainTxt: string;
  leftBtnAction: () => void;
  rightBtnAction: () => void;
  icon?: MarkType;
}

export interface InfoPopStateType {
  infoPop: InfoPopType | null;
}

const initState: InfoPopStateType = {
  infoPop: null,
};

const infoPopSlice = createSlice({
  name: "infoPop",
  initialState: initState,
  reducers: {
    openPop: (state, action: PayloadAction<InfoPopType>) => {
      state.infoPop = action.payload;
    },
    closePop: (state) => {
      state.infoPop = null;
    },
  },
});

export const { openPop, closePop } = infoPopSlice.actions;
export default infoPopSlice.reducer;
