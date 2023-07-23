import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Location, Menu } from "@/typings/types";

export interface LocationState {
  isLoading: boolean;
  item: Location | null;
  error: Error | null;
}

const initialState: LocationState = {
  isLoading: false,
  item: null,
  error: null,
};

export const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location | null>) => {
      state.item = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const locationActions = locationSlice.actions;

export default locationSlice.reducer;
