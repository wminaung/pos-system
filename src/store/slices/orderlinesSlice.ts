import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Menu, Orderline } from "@/typings/types";

export interface OrderlinesState {
  isLoading: boolean;
  items: Orderline[];
  error: Error | null;
}

const initialState: OrderlinesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const orderlinesSlice = createSlice({
  name: "orderlines",
  initialState,
  reducers: {
    setOrderlines: (state, action: PayloadAction<Orderline[]>) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const orderlinesActions = orderlinesSlice.actions;

export default orderlinesSlice.reducer;
