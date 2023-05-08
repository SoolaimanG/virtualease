import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: JSON.parse(sessionStorage.getItem("login")) || false,
};

export const docSlice = createSlice({
  name: "virtualease",
  initialState,
  reducers: {
    LoginFunc: (state) => {
      state.login = sessionStorage.setItem("login", true) || true;
    },
    LogoutFunc: (state) => {
      state.login = sessionStorage.setItem("login", false) || false;
    },
  },
});

export const selectAll = (state) => state.doc;

export const { LoginFunc, LogoutFunc } = docSlice.actions;

export default docSlice.reducer;
