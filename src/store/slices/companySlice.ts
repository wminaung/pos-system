import { Company } from "@/typings/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CompanyState {
  isLoading: boolean;
  item: Company | null;
  error: Error | null;
}

const initialState: CompanyState = {
  isLoading: false,
  item: null,
  error: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company | null>) => {
      state.item = action.payload;
    },
  },
});

export const companyActions = companySlice.actions;

export default companySlice.reducer;
