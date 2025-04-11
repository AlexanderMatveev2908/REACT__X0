import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthStateType {
  user: string | null;
}

const initSTate: AuthStateType = {
  user: sessionStorage.getItem("user") || null,
};

const authSLice = createSlice({
  name: "auth",
  initialState: initSTate,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    logout: () => initSTate,
  },
});

export const { setUser, logout } = authSLice.actions;
export default authSLice.reducer;
