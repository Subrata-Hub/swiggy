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
      if (action.payload.isCommingFromDB) {
        state.totalCardItems =
          state.totalCardItems + action.payload.totalMenuItems;
      } else {
        state.totalCardItems = state.totalCardItems + 1;
      }
      // state.totalCardItems = state.totalCardItems + 1;
    },
    updateCardItems: (state, action) => {
      state.cartItems = state.cartItems.map((ele) =>
        ele?.menuId === action.payload?.menuId &&
        ele?.cartId === action.payload?.cartId
          ? {
              ...ele,
              totalMenuItems: action.payload?.totalMenuItems,
              menuPrice: action.payload.menuPrice,
              finalmenuPrice: action.payload.finalmenuPrice,
              addonsList: action.payload.addonsList,
              selectedAddons: action.payload.selectedAddons,
            }
          : ele
      );

      if (action.payload.action === "Add") {
        state.totalCardItems = state.totalCardItems + 1;
      }

      if (action.payload.action === "Remove") {
        state.totalCardItems = state.totalCardItems - 1;
      }

      // if (action.payload.action === "update") {
      //   state.totalCardItems;
      // }
    },
    removeCardItems: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) =>
          // item.menuId !== action.payload.menuId &&
          item?.cartId !== action.payload?.cartId
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
