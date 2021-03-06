import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BACKEND_URL} from '@env';
console.log(BACKEND_URL);
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
          body: {name, email, password},
        };
      },
    }),
    editUser: builder.mutation({
      query: body => {
        const {formData, token} = body;
        return {
          url: '/edit',
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          body: formData,
        };
      },
    }),
    getUserInfo: builder.mutation({
      query: body => {
        const {id, token} = body;
        return {
          url: `/${id}`,
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useEditUserMutation,
  useGetUserInfoMutation,
} = authApi;
