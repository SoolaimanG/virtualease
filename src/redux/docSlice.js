import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: JSON.parse(localStorage.getItem("login")) || false,
};

export const docSlice = createSlice({
  name: "virtualease",
  initialState,
  reducers: {
    LoginFunc: (state) => {
      state.login = localStorage.setItem("login", true) || true;
    },
    LogoutFunc: (state) => {
      state.login = localStorage.setItem("login", false) || false;
    },
  },
});

export const selectAll = (state) => state.doc;

export const { LoginFunc, LogoutFunc } = docSlice.actions;

export default docSlice.reducer;
