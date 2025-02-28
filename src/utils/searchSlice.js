import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  searchResults: {},
  isSearchResults: false,
  searchResultsForTab: {},
  filterObj: {},
  isFillBtnSelected: false,
  options: {
    radioOptionValue: "NONE",
    radioOptionLabel: "Relevance",
  },
  isResetStore: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,

  reducers: {
    addSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },

    addFilterObject: (state, action) => {
      state.filterObj = { ...state.filterObj, ...action.payload };
    },

    addIsFillBtnSelected: (state, action) => {
      state.isFillBtnSelected = action.payload;
    },

    removeFilterObject: (state, action) => {
      const updatedFilterObj = { ...state.filterObj };

      // Loop through keys in action.payload and delete them
      Object.keys(action.payload).forEach((key) => {
        delete updatedFilterObj[key];
      });

      state.filterObj = updatedFilterObj;
    },

    addIsResetStore: (state, action) => {
      state.isResetStore = action.payload;
    },

    addIsSearchResults: (state, action) => {
      state.isSearchResults = action.payload;
    },

    addSearchResultsForTab: (state, action) => {
      state.searchResultsForTab = action.payload;
    },
    addRadioOptionValue: (state, action) => {
      state.options.radioOptionValue = action.payload;
    },

    addRadioOptionTitle: (state, action) => {
      state.options.radioOptionLabel = action.payload;
    },
    resetState: () => ({ ...initialState }), // Reset state
  },
});

export const {
  addSearchQuery,
  addSearchResults,
  addFilterObject,
  addIsFillBtnSelected,
  removeFilterObject,
  addIsSearchResults,
  addSearchResultsForTab,
  addRadioOptionValue,
  addRadioOptionTitle,
  resetState,
  addIsResetStore,
} = searchSlice.actions;
export default searchSlice.reducer;
