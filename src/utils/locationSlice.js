import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  place: {
    // description: "Kolkata, West Bengal, India",
    // place_id: "ChIJZ_YISduC-DkRvCxsj-Yw40M",
  },
  latlng: {
    // LAT: "22.5743545",
    // LNG: "88.3628734",
  },
  address: [],
};

const locationSlice = createSlice({
  name: location,
  initialState,
  reducers: {
    addPlace: (state, action) => {
      state.place = action.payload;
    },
    addLatlng: (state, action) => {
      state.latlng = action.payload;
    },
    addAddress: (state, action) => {
      state.address = action.payload;
    },

    reSetLocationStore: () => initialState,
  },
});

export const { addPlace, addLatlng, addAddress, reSetLocationStore } =
  locationSlice.actions;
export default locationSlice.reducer;
