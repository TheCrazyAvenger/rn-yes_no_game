import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'yesnoApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://pokeapi.co/api/v2/'}),
  endpoints: builder => ({
    getStories: builder.query({
      query: () => `pokemon/`,
    }),
  }),
});
