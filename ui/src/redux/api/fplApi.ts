import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fplApi = createApi({
  reducerPath: 'fplApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    getFPLData: builder.query<any, void>({
      query: () => 'fpl',
    }),
  }),
});

export const { useGetFPLDataQuery } = fplApi;
