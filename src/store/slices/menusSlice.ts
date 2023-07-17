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
  "app/fetchAppData",
  async (locationId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppLoading(true));
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/app?locationId=${locationId}`
    );

    const responseJson = await response.json();
    const {} = responseJson;
  }
);

// Action creators are generated for each case reducer function
export const menusActions = menusSlice.actions;

export default menusSlice.reducer;
