import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BACKEND_URL} from '@env';
console.log(BACKEND_URL);
export const yesnoApi = createApi({
  reducerPath: 'yesnoApi',
  baseQuery: fetchBaseQuery({baseUrl: `${BACKEND_URL}/yesno/`}),
  endpoints: builder => ({
    getStories: builder.query({
      query: body => `/all/${body.uid}`,
    }),
    reviewYesNo: builder.mutation({
      query: body => {
        const {id, time, difficulty, rating, userId, token} = body;
        return {
          url: `/${id}`,
          method: 'PATCH',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          body: {
            time,
            difficulty,
            rating,
            userId,
          },
        };
      },
    }),
    submitStory: builder.mutation({
      query: body => {
        const {data, token} = body;
        return {
          url: `/submit`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetStoriesQuery,
  useReviewYesNoMutation,
  useSubmitStoryMutation,
} = yesnoApi;
