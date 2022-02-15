import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const yesnoApi = createApi({
  reducerPath: 'yesnoApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.170.68:5000/api/yesno/'}),
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
  }),
});

export const {useGetStoriesQuery, useReviewYesNoMutation} = yesnoApi;
