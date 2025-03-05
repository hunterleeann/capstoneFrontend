import { createSlice } from "@reduxjs/toolkit";
import { api } from "/store/api";

const registerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/register",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      providesTag: ["User"],
    }),
    getUser: builder.query({
      query: () => ({
        url: "/auth/login",
        method: "POST",
      }),
      providesTags: ["User"],
    }), 
  }),
  
});

const storeToken = (state, { payload }) => {
  localStorage.setItem("token", payload.token);
};

const registerSlice = createSlice({
  name: "register",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.addUser.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.getUser.matchFulfilled, storeToken);
  },
});

export default registerSlice.reducer;

export const { useAddUserMutation, useGetUserQuery } = registerApi;
