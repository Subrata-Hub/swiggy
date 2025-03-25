import { configureStore } from "@reduxjs/toolkit";
import menuSearchReducer from "./menuSearchSlice";
import menuItemReducer from "./menuItemSlice";
import searchReducer from "./searchSlice";
import configReducer from "./configSlice";
import cartReducer from "./cartSlice";
import locationReducer from "./locationSlice";

const appStore = configureStore({
  reducer: {
    menuSearch: menuSearchReducer,
    menuItem: menuItemReducer,
    search: searchReducer,
    config: configReducer,
    cart: cartReducer,
    location: locationReducer,
  },
});

export default appStore;
