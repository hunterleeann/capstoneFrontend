import { createSlice } from "@reduxjs/toolkit";
import { api } from "/store/api"; 


const classApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query({
      query: () => ({
        url: "/classes",
        method: "GET",
      }),
      providesTag: ["Class"],
    }),
    getCustomer: builder.query({
        query: ({ id }) => ({
          url: "/auth/login",
          method: "GET",
          body: {
          id
          },
        }),
        providesTag: ["User"],
      }),
      getUserClass: builder.query({
        query: (classType) => ({
          url: "/classes/${classType}",
          method: "GET",
        }),
        providesTag: ["Class"],
      }),
  }),
  
});

const storeToken = (state, { payload }) => {
  localStorage.setItem("token", payload.token);
};

const classSlice = createSlice({
  name: "classes",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.addUser.matchFulfilled, storeToken);
  },
});

export default classSlice.reducer;

export const {  useGetClassesQuery, useGetCustomerQuery, useGetUserClassQuery} = classApi;
