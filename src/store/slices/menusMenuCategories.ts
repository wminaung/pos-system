import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MenuMenuCategory } from "@prisma/client";

export interface MenusMenuCategoriesState {
  isLoading: boolean;
  items: MenuMenuCategory[];
  error: Error | null;
}

const initialState: MenusMenuCategoriesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menusMenuCategoriesSlice = createSlice({
  name: "menusMenuCategories",
  initialState,
  reducers: {
    setMenusMenuCategories: (
      state,
      action: PayloadAction<MenuMenuCategory[]>
    ) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const menusMenuCategoriesActions = menusMenuCategoriesSlice.actions;

export default menusMenuCategoriesSlice.reducer;
