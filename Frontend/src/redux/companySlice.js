import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleCompany: null,
  companies: [],
  searchCompany: "",
};

const companySlice = createSlice({
  name: "Company",
  initialState,
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setcompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompany: (state, action) => {
      state.searchCompany = action.payload;
    },
  },
});

export default companySlice.reducer;
export const { setSingleCompany, setcompanies, setSearchCompany } =
  companySlice.actions;
