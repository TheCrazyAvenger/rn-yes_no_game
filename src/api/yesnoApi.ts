import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const yesnoApi = createApi({
  reducerPath: 'yesnoApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.170.68:5000/api/yesno/'}),
  endpoints: builder => ({
    getStories: builder.query({
      query: () => '/all',
    }),
  }),
});

export const {useGetStoriesQuery} = yesnoApi;
