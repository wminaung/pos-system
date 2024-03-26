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
      state.items = [action.payload, ...state.items];
    },
    editMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    removeMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.items = [
        ...state.items.filter((item) => {
          return item.id !== action.payload.id;
        }),
      ];
    },
  },
});

export const menuCategoriesActions = menuCategoriesSlice.actions;

export default menuCategoriesSlice.reducer;
