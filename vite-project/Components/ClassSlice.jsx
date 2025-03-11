import { createSlice } from "@reduxjs/toolkit";
import { api } from "/store/api"; 


const classApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query({
      query: ({ email, password }) => ({
        url: "/classes",
        method: "GET",
        body: {
          email,
          password,
        },
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
    // getUser: builder.query({
    //   query: () => ({
    //     url: "/auth/login",
    //     method: "POST",
    //   }),
    //   providesTags: ["User"],
    // }), 
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

export const {  useGetClassesQuery, useGetCustomerQuery } = classApi;
