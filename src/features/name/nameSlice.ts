import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NameState {
  value: string;
}

const initialState: NameState = {
  value: "Win Min Aung",
};

const nameSlice = createSlice({
  name: "NAME",
  initialState,
  reducers: {
    // defaultName
    defaultName(state) {
      state.value = initialState.value;
    },
    // changeName
    changeName(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { defaultName, changeName } = nameSlice.actions;

export default nameSlice.reducer;
