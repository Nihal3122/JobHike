import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],
  singleJob: null,
  allAdminJob: [],
  searchJob: "",
  allAppliedJobs: [],
  searchQuery: "",
};

const jobSlice = createSlice({
  name: "Job",
  initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJob: (state, action) => {
      state.allAdminJob = action.payload;
    },
    setSearchJob: (state, action) => {
      state.searchJob = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export default jobSlice.reducer;
export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJob,
  setSearchJob,
  setAllAppliedJobs,
  setSearchQuery,
} = jobSlice.actions;
