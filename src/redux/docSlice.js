import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: JSON.parse(localStorage.getItem("uid")) || "",
  login: JSON.parse(localStorage.getItem("login")) || false,
};

export const docSlice = createSlice({
  name: "virtualease",
  initialState,
  reducers: {
    updateUid: (state, action) => {
      state.uid = action.payload;
    },
    LoginFunc: (state) => {
      state.login = localStorage.setItem("login", true) || true;
    },
    LogoutFunc: (state) => {
      state.login = localStorage.setItem("login", false) || false;
    },
  },
});

export const selectAll = (state) => state.doc;

export const { updateUid, LoginFunc, LogoutFunc } = docSlice.actions;

export default docSlice.reducer;
