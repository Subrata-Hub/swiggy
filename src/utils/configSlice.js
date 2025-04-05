import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    id: null,
    setting: {
      suggestionText: "",
      searchResultType: "",
    },
  },

  reducers: {
    addConfigId: (state, action) => {
      state.id = action.payload;
    },
    addSuggestionText: (state, action) => {
      state.setting.suggestionText = action.payload;
    },

    addSearchResultType: (state, action) => {
      state.setting.searchResultType = action.payload;
    },
  },
});

export const { addSuggestionText, addSearchResultType, addConfigId } =
  configSlice.actions;
export default configSlice.reducer;
