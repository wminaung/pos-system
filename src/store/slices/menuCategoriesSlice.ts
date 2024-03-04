import { MenuCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MenuCategoryState {
  isLoading: boolean;
  items: MenuCategory[];
  error: Error | null;
}

const initialState: MenuCategoryState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menuCategoriesSlice = createSlice({
  name: "menuCategories",
  initialState,
  reducers: {
    setMenuCategories: (state, action: PayloadAction<MenuCategory[]>) => {
      state.items = action.payload;
    },
    addMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const menuCategoriesActions = menuCategoriesSlice.actions;

export default menuCategoriesSlice.reducer;
