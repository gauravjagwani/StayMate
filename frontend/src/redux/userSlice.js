import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  token: null,
  // tripList: []
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setTripList: (state, action) => {
      state.user.tripList = action.payload;
    },
    setWishList: (state, action) => {
      state.user.wishList = action.payload;
    },
    setPropertyList: (state, action) => {
      state.user.propertyList = action.payload;
    },
    setReservationList: (state, action) => {
      state.user.reservationList = action.payload;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setTripList,
  setWishList,
  setPropertyList,
  setReservationList,
} = userSlice.actions;
export default userSlice.reducer;
