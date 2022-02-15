import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BACKEND_URL} from '@env';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: `${BACKEND_URL}/users`}),

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
          headers: {
            'Content-Type': 'application/json',
          },
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
