import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { config } from "@/config/config";

export interface CounterState {
  value: number;
  data: any;
}

export const fetchUsers = createAsyncThunk("fetch/users", async () => {
  const response = await fetch(`/api/hello`);
  return await response.json();
});

const initialState: CounterState = {
  value: 0,
  data: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;

export const useCounterSlice = () => {
  //@ts-ignore
  const state = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  const actions = counterSlice.actions;

  return { state, dispatch, actions: { ...actions, fetchUsers } };
};
