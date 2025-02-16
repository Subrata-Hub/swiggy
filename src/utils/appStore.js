import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import menuItemReducer from "./menuItemSlice";

const appStore = configureStore({
  reducer: {
    search: searchReducer,
    menuItem: menuItemReducer,
  },
});

export default appStore;
