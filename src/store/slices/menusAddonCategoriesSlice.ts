import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MenuAddonCategory } from "@/typings/types";

export interface MenusAddonCategoriesState {
  isLoading: boolean;
  items: MenuAddonCategory[];
  error: Error | null;
}

const initialState: MenusAddonCategoriesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menusAddonCategoriesSlice = createSlice({
  name: "menusAddonCategories",
  initialState,
  reducers: {
    setMenusAddonCategories: (
      state,
      action: PayloadAction<MenuAddonCategory[]>
    ) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMenusAddonCategories } = menusAddonCategoriesSlice.actions;

export default menusAddonCategoriesSlice.reducer;
