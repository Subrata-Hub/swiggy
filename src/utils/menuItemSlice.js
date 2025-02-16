import { createSlice } from "@reduxjs/toolkit";

const menuItemSlice = createSlice({
  name: "menuItem",
  initialState: {
    menuItems: [],
  },

  reducers: {
    addMenuItems: (state, action) => {
      state.menuItems = action.payload;
    },
  },
});

export const { addMenuItems } = menuItemSlice.actions;
export default menuItemSlice.reducer;
