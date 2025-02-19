import { createSlice } from "@reduxjs/toolkit";

const menuSearchSlice = createSlice({
  name: "menuSearch",
  initialState: {
    menuSearchQuery: "",
  },

  reducers: {
    addMenuSearchQuery: (state, action) => {
      state.menuSearchQuery = action.payload;
    },
  },
});

export const { addMenuSearchQuery } = menuSearchSlice.actions;
export default menuSearchSlice.reducer;
