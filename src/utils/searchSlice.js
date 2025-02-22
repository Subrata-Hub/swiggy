import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQuery: "",
    searchResults: {},
    isSearchResults: false,
    searchResultsForTab: {},
  },

  reducers: {
    addSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },

    addIsSearchResults: (state, action) => {
      state.isSearchResults = action.payload;
    },

    addSearchResultsForTab: (state, action) => {
      state.searchResultsForTab = action.payload;
    },
  },
});

export const {
  addSearchQuery,
  addSearchResults,
  addIsSearchResults,
  addSearchResultsForTab,
} = searchSlice.actions;
export default searchSlice.reducer;
