import { Company } from "@/typings/types";
import { createSlice } from "@reduxjs/toolkit";

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

interface SetCompanyAction {
  payload: Company | null;
  type: string;
}

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: SetCompanyAction) => {
      state.item = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;

export default companySlice.reducer;
