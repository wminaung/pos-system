import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Menu, Orderline, OrderlineItem } from "@/typings/types";

export interface OrderlineItemsState {
  isLoading: boolean;
  items: OrderlineItem[];
  error: Error | null;
}

const initialState: OrderlineItemsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const orderlineItemsSlice = createSlice({
  name: "orderlineItems",
  initialState,
  reducers: {
    setOrderlineItems: (state, action: PayloadAction<OrderlineItem[]>) => {
      state.items = action.payload;
    },
    addOrderLineItem: (state, action: PayloadAction<OrderlineItem>) => {
      state.items = [...state.items, action.payload];
    },
    resetOrderlineItems: (state) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const orderlineItemsActions = orderlineItemsSlice.actions;

export default orderlineItemsSlice.reducer;
