import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from "../../types/UserType"
import { Post } from '../../types/PostType'
import { Todo } from '../../types/TodoType'

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
    tagTypes: ['Todo'],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], number | void>({
            query: (limit) => `/users?_limit=${limit ?? 10}`
        }),
        getUserById: builder.query<User, number>({
            query: (id) => `/users/${id}`
        }),
        getPostsByUserId: builder.query<Post[], number>({
            query: (userId) => `/posts?userId=${userId}`
        }),
        getTodos: builder.query<Todo[], void>({
            query: () => `/todos`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Todo' as const, id })),
                        { type: 'Todo', id: 'LIST' },
                      ]
                    : [{ type: 'Todo', id: 'LIST' }],
        }),
        getTodosByUserId: builder.query<Todo[], number>({
            query: (userId) => `/todos?userId=${userId}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Todo' as const, id })),
                        { type: 'Todo', id: 'LIST' },
                      ]
                    : [{ type: 'Todo', id: 'LIST' }],
        }),
        // Mutations
        addUser: builder.mutation<User, User>({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user
            })
        }),
        updateUser: builder.mutation<User, User>({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: 'PUT',
                body: user
            })
        }),
        deleteUser: builder.mutation<User, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            })
        }),
        // Post mutations
        updatePost: builder.mutation<Post, Post>({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'PUT',
                body: post
            })
        }),
        deletePost: builder.mutation<void, number>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            })
        }),
        // Todo mutations
        updateTodo: builder.mutation<Todo, Todo>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Todo', id }]
        }),
    })
})

export const { 
    useGetUsersQuery, 
    useGetUserByIdQuery, 
    useGetPostsByUserIdQuery, 
    useGetTodosQuery,
    useGetTodosByUserIdQuery,
    // Mutations
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useUpdateTodoMutation
} = apiSlice