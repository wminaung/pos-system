import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MenuMenuCategoryLocation, Order } from "@/typings/types";

export interface MenusMenuCategoriesLocationsState {
  isLoading: boolean;
  items: MenuMenuCategoryLocation[];
  error: Error | null;
}

const initialState: MenusMenuCategoriesLocationsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menusMenuCategoriesLocationsSlice = createSlice({
  name: "menusMenuCategoriesLocations",
  initialState,
  reducers: {
    setMenusMenuCategoriesLocations: (
      state,
      action: PayloadAction<MenuMenuCategoryLocation[]>
    ) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const menusMenuCategoriesLocationsActions =
  menusMenuCategoriesLocationsSlice.actions;

export default menusMenuCategoriesLocationsSlice.reducer;
