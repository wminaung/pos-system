import { Addon, Company } from "@/typings/types";
import { createSlice } from "@reduxjs/toolkit";

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

interface SetAddonsAction {
  payload: Addon[];
  type: string;
}

export const addonsSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    setAddons: (state, action: SetAddonsAction) => {
      state.items = action.payload;
    },
  },
});

export const { setAddons } = addonsSlice.actions;

export default addonsSlice.reducer;
