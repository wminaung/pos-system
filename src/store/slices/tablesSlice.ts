import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Menu, Table } from "@/typings/types";

export interface TablesState {
  isLoading: boolean;
  items: Table[];
  error: Error | null;
}

const initialState: TablesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setTables: (state, action: PayloadAction<Table[]>) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTables } = tablesSlice.actions;

export default tablesSlice.reducer;
