import { Addon } from "@/typings/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AddonsState {
  isLoading: boolean;
  items: Addon[];
  error: Error | null;
}

const initialState: AddonsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const addonsSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    setAddons: (state, action: PayloadAction<Addon[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setAddons } = addonsSlice.actions;

export default addonsSlice.reducer;
