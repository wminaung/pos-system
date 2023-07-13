import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { config } from "@/config/config";
import { Menu } from "@/typings/types";
import { RootState } from "..";

export interface MenuState {
  isLoading: boolean;
  items: Menu[];
  error: Error | null;
}

const initialState: MenuState = {
  isLoading: false,
  items: [],
  error: null,
};
interface SetMenusAction {
  payload: Menu[];
  type: string;
}
export const menusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    setMenus: (state, action: SetMenusAction) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMenus } = menusSlice.actions;

export default menusSlice.reducer;
