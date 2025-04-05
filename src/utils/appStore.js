// import { configureStore } from "@reduxjs/toolkit";
// import menuSearchReducer from "./menuSearchSlice";
// import menuItemReducer from "./menuItemSlice";
// import searchReducer from "./searchSlice";
// import configReducer from "./configSlice";
// import cartReducer from "./cartSlice";
// import locationReducer from "./locationSlice";

// const appStore = configureStore({
//   reducer: {
//     menuSearch: menuSearchReducer,
//     menuItem: menuItemReducer,
//     search: searchReducer,
//     config: configReducer,
//     cart: cartReducer,
//     location: locationReducer,
//   },

// });

// export default appStore;

import { configureStore } from "@reduxjs/toolkit";
import menuSearchReducer from "./menuSearchSlice";
import menuItemReducer from "./menuItemSlice";
import searchReducer from "./searchSlice";
import configReducer from "./configSlice";
import cartReducer from "./cartSlice";
import locationReducer from "./locationSlice";
import firebaseDataReducer from "./firebaseDataSlice";

const appStore = configureStore({
  reducer: {
    menuSearch: menuSearchReducer,
    menuItem: menuItemReducer,
    search: searchReducer,
    config: configReducer,
    cart: cartReducer,
    location: locationReducer,
    firebaseData: firebaseDataReducer,
  },
});

appStore.subscribe(() => {
  const state = appStore.getState();
  const anonymousUid = localStorage.getItem("anonymousUid");
  if (anonymousUid) {
    localStorage.setItem(
      `anonymous_cart_${anonymousUid}`,
      JSON.stringify(state.cart)
    );
    localStorage.setItem(
      `anonymous_location_${anonymousUid}`,
      JSON.stringify(state.location)
    );
  }
});

export default appStore;
