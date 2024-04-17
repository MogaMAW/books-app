import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate(state, action) {
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = !!state.accessToken;
      state.user = action.payload.user;
    },
    logout(state) {
      state.accessToken = null;
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;

export default authSlice.reducer;
