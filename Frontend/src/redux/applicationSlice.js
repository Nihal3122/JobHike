import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allApplicants: [],
};

const applicationSlice = createSlice({
  name: "Application",
  initialState,
  reducers: {
    setAppApplicants: (state, action) => {
      state.allApplicants = action.payload;
    },
  },
});

export default applicationSlice.reducer;
export const {setAppApplicants} = applicationSlice.actions;
