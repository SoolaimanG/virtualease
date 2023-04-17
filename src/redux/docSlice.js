import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: JSON.parse(localStorage.getItem("uid")) || "",
};

export const docSlice = createSlice({
  name: "virtualease",
  initialState,
  reducers: {
    updateUid: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export const selectAll = (state) => state.doc;

export const { updateUid } = docSlice.actions;

export default docSlice.reducer;
