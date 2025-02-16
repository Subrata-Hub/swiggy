import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQuery: "",
  },

  reducers: {
    addSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
