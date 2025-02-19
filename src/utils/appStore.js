import { configureStore } from "@reduxjs/toolkit";
import menuSearchReducer from "./menuSearchSlice";
import menuItemReducer from "./menuItemSlice";
import searchReducer from "./searchSlice";
import configReducer from "./configSlice";

const appStore = configureStore({
  reducer: {
    menuSearch: menuSearchReducer,
    menuItem: menuItemReducer,
    search: searchReducer,
    config: configReducer,
  },
});

export default appStore;
