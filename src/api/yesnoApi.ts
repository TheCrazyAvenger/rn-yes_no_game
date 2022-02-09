import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const yesnoApi = createApi({
  reducerPath: 'yesnoApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.0.106:5000/api/yesno/'}),
  endpoints: builder => ({
    getStories: builder.query({
      query: () => '/all',
    }),
    reviewYesNo: builder.mutation({
      query: body => {
        const {id, time, difficulty, rating} = body;
        return {
          url: `/${id}`,
          method: 'PATCH',
          body: {
            time,
            difficulty,
            rating,
          },
        };
      },
    }),
  }),
});

export const {useGetStoriesQuery, useReviewYesNoMutation} = yesnoApi;
