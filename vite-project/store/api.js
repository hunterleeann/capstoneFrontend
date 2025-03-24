import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://capstonebackend-u3uj.onrender.com",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Class", "Review"], 
  endpoints: () => ({}),

  
});

// export const classApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     getClasses: builder.query({
//       query: () => "/classes",
//       providesTags: ["Class"],
//     }),
//     getMyRevs: builder.query({
//       query: () => ({
//         url: `/account/reviews`,
//         method: "GET",
//       }),
//       providesTags: ["Review"],
//     }),
//     editRev: builder.mutation({
//       query: (revId, { score, comment }) => ({
//         url: `/myReviews/${revId}`,
//         method: "PATCH",
//         body: {
//           score,
//           comment,
//         },
//       }),
//       invalidatesTags: ["Review"],
//     }),
//   }),
  
// });


