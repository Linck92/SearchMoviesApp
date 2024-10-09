import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = 'http://localhost:3000/users'

export const apiGetUsers = createApi({
    reducerPath: 'apiGetUsers',
    tagTypes: ['Users'],     // это ключ, по нему кешируются данные
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),

    // базовый endpoint нужно указать здесь 
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/',
            providesTags: () => [{
                type: 'Users'       //  тут этот ключ указываем для обновления кэша
            }]
        }),
        addUser: builder.mutation({
            query: data => ({
                body: {...data, favourites: [], inputValue: ''},
                url: '/',
                method: 'POST',
            }),
            invalidatesTags: () => [{
                type: 'Users'          // ключ для обновления кеша. Его берем из основного api.js
            }],
        }),
        updateUser: builder.mutation({
            query: user => ({
                body: user,
                url: `/${user.id}`,
                method: 'PUT',
            }),
        }),
    }),
})

export const {useGetUsersQuery, useAddUserMutation, useUpdateUserMutation} = apiGetUsers  // useGetRecipesQuery - это получилось из этого getRecipes: builder.query({