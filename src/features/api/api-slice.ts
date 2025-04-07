import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from "../../types/UserType"
import { Post } from '../../types/PostType'
import { Todo } from '../../types/TodoType'

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], number | void>({
            query: (limit = 10) => `/users?_limit=${limit}`
        }),
        getUserById: builder.query<User, number>({
            query: (id) => `/users/${id}`
        }),
        getPostsByUserId: builder.query<Post[], number>({
            query: (userId) => `/posts?userId=${userId}`
        }),
        getTodosByUserId: builder.query<Todo[], void>({
            query: () => `/todos`
        })
    })
})

export const { useGetUsersQuery, useGetUserByIdQuery } = apiSlice