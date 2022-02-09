import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.0.106:5000/api/users'}),
  endpoints: builder => ({
    login: builder.mutation({
      query: body => {
        const {email, password} = body;
        return {
          url: '/login',
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },
          body: {email, password},
        };
      },
    }),
    signup: builder.mutation({
      query: body => {
        const {name, email, password} = body;
        return {
          url: '/signup',
          method: 'POST',
          body: {
            name,
            email,
            password,
          },
        };
      },
    }),
  }),
});

export const {useLoginMutation, useSignupMutation} = authApi;
