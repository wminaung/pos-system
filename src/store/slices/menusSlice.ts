import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAppLoading } from "./appSlice";
import { config } from "@/config/config";
import { Menu } from "@prisma/client";

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
    editMenu: (state, action: PayloadAction<Menu>) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    removeMenu: (state, action: PayloadAction<Menu>) => {
      state.items = [
        ...state.items.filter((item) => {
          return item.id !== action.payload.id;
        }),
      ];
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
