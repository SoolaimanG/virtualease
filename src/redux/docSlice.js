import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Soolaiman",
};

export const docSlice = createSlice({
  name: "virtualease",
  initialState,
  reducers: {},
});

export const selectAll = (state) => state.doc;

export const {} = docSlice.actions;

export default docSlice.reducer;
