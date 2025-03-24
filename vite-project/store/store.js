import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import registerSlice from "/components/RegisterSlice";
import ClassSlice from "../Components/ClassSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    register: registerSlice,
    classes: ClassSlice,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.middleware),
});