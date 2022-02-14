import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const reportApi = createApi({
  reducerPath: 'reportApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.170.68:5000/api/report'}),

  endpoints: builder => ({
    sendReport: builder.mutation({
      query: body => {
        return {
          url: '/send',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {useSendReportMutation} = reportApi;
