import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BACKEND_URL} from '@env';

export const reportApi = createApi({
  reducerPath: 'reportApi',
  baseQuery: fetchBaseQuery({baseUrl: `${BACKEND_URL}/report`}),

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
