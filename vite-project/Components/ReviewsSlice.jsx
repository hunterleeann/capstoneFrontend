import { api } from "../store/api";

const reviewsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (classId) => ({
        url: `/classes/${classId}/reviews`,
        // method: "GET",
      }),
      providesTags: ["Review"],
    }),
    addRev: builder.query({
      query: (classId, { score, comment }) => ({
        url: `/classes/${classId}/reviews`,
        method: "POST",
        body: {
          score,
          comment,
        },
      }),
      providesTags: ["Review"],
    }),
    getMyRevs: builder.query({
      query: () => ({
        url: `/account/reviews`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    editRev: builder.mutation({
      query: (revId, { score, comment }) => ({
        url: `/myReviews/${revId}`,
        method: "PATCH",
        body: {
          score,
          comment,
        },
      }),
      invalidatesTags: ["Review"],
    }),
  }),
  

});

export const { useGetReviewsQuery, useAddRevQuery, useGetMyRevsQuery, useEditRevMutation} = reviewsApi;
