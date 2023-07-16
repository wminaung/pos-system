import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Location, Menu } from "@/typings/types";

export interface LocationsState {
  isLoading: boolean;
  items: Location[];
  error: Error | null;
}

const initialState: LocationsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocations } = locationsSlice.actions;

export default locationsSlice.reducer;
