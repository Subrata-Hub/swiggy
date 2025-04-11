import { createSlice } from "@reduxjs/toolkit";

const firebaseDataSlice = createSlice({
  name: "firebaseData",
  initialState: {
    userData: [],
    userLocationData: {
      locuid: null,
      latlng: {},
      place: {},
      address: [],
    },
  },

  reducers: {
    addUserData: (state, action) => {
      state.userData = action.payload;
    },

    addUserLocationData: (state, action) => {
      state.userLocationData = action.payload;
    },
  },
});

export const { addUserData, addUserLocationData } = firebaseDataSlice.actions;
export default firebaseDataSlice.reducer;
