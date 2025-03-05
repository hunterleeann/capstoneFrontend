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
        query: (classId, {score, comment}) => ({
          url: `/classes/${classId}/reviews`,
          method: "POST",
        body: {
          score,
          comment,
        },
    }),
        providesTags: ["Review"],
      }),
  }),
});

export const { useGetReviewsQuery, useAddRevQuery } = reviewsApi;
