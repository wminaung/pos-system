import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 10,
};

const counterSlice = createSlice({
  name: "COUNTER",
  initialState,
  reducers: {
    // increment
    increment(state) {
      state.value++;
    },
    // amountAdded
    amountadded(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, amountadded } = counterSlice.actions;

export default counterSlice.reducer;
