import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import registerSlice from "/components/RegisterSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    register: registerSlice,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.middleware),
});