import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://task-master-server-vert.vercel.app' }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks',
      providesTags: ["Tasks"]
    }),
    updateStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),

    addTask: builder.mutation({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Tasks"],
    }),
    searchTasks: builder.query({
      query: (text) => `/findTasksByName/${text}`,
    }),
  }),
});

export const { useGetTaskQuery, useUpdateStatusMutation, useAddTaskMutation, useDeleteTaskMutation, useSearchTasksQuery } = baseApi;
export default baseApi;
