import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    setting: {
      suggestionText: "",
      searchResultType: "",
    },
  },

  reducers: {
    addSuggestionText: (state, action) => {
      state.setting.suggestionText = action.payload;
    },

    addSearchResultType: (state, action) => {
      state.setting.searchResultType = action.payload;
    },
  },
});

export const { addSuggestionText, addSearchResultType } = configSlice.actions;
export default configSlice.reducer;
