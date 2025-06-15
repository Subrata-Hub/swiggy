import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    setting: {
      suggestionText: "",
      searchResultType: "",
      searchActionType: "",
      isSelected: false,
    },
    resItems: [],
    isCheckOutPage: false,
    
  },

  reducers: {
    addSuggestionText: (state, action) => {
      state.setting.suggestionText = action.payload;
    },

    addSearchResultType: (state, action) => {
      state.setting.searchResultType = action.payload;
    },

    addSearchActionType: (state, action) => {
      state.setting.searchActionType = action.payload;
    },

    addIsSelected: (state, action) => {
      state.setting.isSelected = action.payload;
    },

    addResItem: (state, action) => {
      state.resItems.push(action.payload);
    },

    addIsCheckOutPage: (state, action) => {
      state.isCheckOutPage = action.payload;
    },


  },
});

export const {
  addSuggestionText,
  addSearchResultType,
  addSearchActionType,
  addIsSelected,
  addResItem,
  addIsCheckOutPage,
} = configSlice.actions;
export default configSlice.reducer;
