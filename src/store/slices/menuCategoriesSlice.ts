import { MenuCategory } from "@/typings/types";
import { createSlice } from "@reduxjs/toolkit";

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

interface SetMenuCategoriesAction {
  payload: MenuCategory[];
  type: string;
}

export const menuCategoriesSlice = createSlice({
  name: "menuCategories",
  initialState,
  reducers: {
    setMenuCategories: (state, action: SetMenuCategoriesAction) => {
      state.items = action.payload;
    },
  },
});

export const { setMenuCategories } = menuCategoriesSlice.actions;

export default menuCategoriesSlice.reducer;
