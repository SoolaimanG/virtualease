import { configureStore } from "@reduxjs/toolkit";
import docReducer from "../redux/docSlice";

export const store = configureStore({
  reducer: {
    doc: docReducer,
  },
});
