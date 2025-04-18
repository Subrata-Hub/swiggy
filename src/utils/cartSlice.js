import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCardItems: 0,
  resInfo: {},
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addResInfo: (state, action) => {
      state.resInfo = action.payload;
    },
    addCartItems: (state, action) => {
      state.cartItems.push(action.payload);
      state.totalCardItems = state.totalCardItems + 1;
    },
    updateCardItems: (state, action) => {
      state.cartItems = state.cartItems.flatMap((ele) =>
        ele?.menuId === action.payload?.menuId
          ? { ...ele, totalMenuItems: action.payload?.totalMenuItems }
          : ele
      );

      if (action.payload.action === "Add") {
        state.totalCardItems = state.totalCardItems + 1;
      }

      if (action.payload.action === "Remove") {
        state.totalCardItems = state.totalCardItems - 1;
      }
    },
    removeCardItems: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.menuId !== action.payload.menuId
      );
    },

    reSetStore: () => initialState,
  },
});

export const {
  addResInfo,
  addCartItems,
  updateCardItems,
  removeCardItems,
  reSetStore,
} = cartSlice.actions;
export default cartSlice.reducer;
