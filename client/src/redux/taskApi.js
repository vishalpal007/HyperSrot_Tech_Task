import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/task" }),
    tagTypes: ["task"],
    endpoints: (builder) => {
        return {
            getTask: builder.query({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                providesTags: ["task"],
                transformResponse: data => data.result
            }),
            addTask: builder.mutation({
                query: taskData => {
                    return {
                        url: "/add",
                        method: "POST",
                        body: taskData
                    }
                },
                invalidatesTags: ["task"]
            }),


            deleteTask: builder.mutation({
                query: id => {
                    return {
                        url: `/delete/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["task"]
            }),


            updateTask: builder.mutation({
                query: taskData => {
                    return {
                        url: `/update/${taskData._id}`,
                        method: "PUT",
                        body: taskData
                    }
                },
                invalidatesTags: ["task"]
            }),

        }
    }
})

export const { useGetTaskQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = taskApi
