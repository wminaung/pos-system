import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddonCategory, Menu } from "@/typings/types";
import { RootState } from "..";

export interface AddonCategoriesState {
  isLoading: boolean;
  items: AddonCategory[];
  error: Error | null;
}

const initialState: AddonCategoriesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const addonCategoriesSlice = createSlice({
  name: "addonCategories",
  initialState,
  reducers: {
    setAddonCategories: (state, action: PayloadAction<AddonCategory[]>) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const addonCategoriesActions = addonCategoriesSlice.actions;

export default addonCategoriesSlice.reducer;
