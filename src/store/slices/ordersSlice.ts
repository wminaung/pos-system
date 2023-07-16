import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Menu, Order } from "@/typings/types";

export interface OrdersState {
  isLoading: boolean;
  items: Order[];
  error: Error | null;
}

const initialState: OrdersState = {
  isLoading: false,
  items: [],
  error: null,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
