import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Menu } from "@/typings/types";
import { setAppLoading } from "./appSlice";
import { config } from "@/config/config";

export interface MenusState {
  isLoading: boolean;
  items: Menu[];
  error: Error | null;
}

const initialState: MenusState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    setMenus: (state, action: PayloadAction<Menu[]>) => {
      state.items = action.payload;
    },
    addMenu: (state, action: PayloadAction<Menu>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const fetchMenus = createAsyncThunk(
  "fetch/get/menus",
  async (locationId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppLoading(true));
    const response = await fetch(`${config.backofficeApiBaseUrl}/menus`);

    const responseJson = await response.json();
    const {} = responseJson;
  }
);

// Action creators are generated for each case reducer function
export const menusActions = menusSlice.actions;

export default menusSlice.reducer;
