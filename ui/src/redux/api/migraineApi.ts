import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const CACHING_TAGS = {
  MIGRAINE_TYPE: 'MIGRAINE_TYPE',
  MIGRAINE_ENTITY: 'MIGRAINE_ENTITY',
};

export const migraineApi = createApi({
  reducerPath: 'migraineApi',
  tagTypes: [CACHING_TAGS.MIGRAINE_TYPE],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getMigraineTypes: builder.query<any, void>({
      query: () => '/migraine-types',
      providesTags: [CACHING_TAGS.MIGRAINE_TYPE],
    }),
    addMigraineType: builder.mutation({
      query: (name) => ({
        url: '/migraine-types',
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: [CACHING_TAGS.MIGRAINE_TYPE],
    }),
    deleteMigraineType: builder.mutation({
      query: (id) => ({
        url: `/migraine-types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [CACHING_TAGS.MIGRAINE_TYPE],
    }),
    addMigraine: builder.mutation({
      query: (migraine) => ({
        url: '/migraines',
        method: 'POST',
        body: migraine,
      }),
      invalidatesTags: [CACHING_TAGS.MIGRAINE_ENTITY],
    }),
    getMigraines: builder.query<any, void>({
      query: () => '/migraines',
      providesTags: [CACHING_TAGS.MIGRAINE_ENTITY],
    }),
  }),
});

export const {
  useGetMigraineTypesQuery,
  useGetMigrainesQuery,
  useAddMigraineTypeMutation,
  useDeleteMigraineTypeMutation,
  useAddMigraineMutation,
} = migraineApi;
