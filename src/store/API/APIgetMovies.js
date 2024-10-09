import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = 'http://www.omdbapi.com'

export const apiGetMovies = createApi({
    reducerPath: 'apiGetMovies',
    tagTypes: ['Movies'],     // это ключ, по нему кешируются данные
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),

    // базовый endpoint нужно указать здесь 
    endpoints: builder => ({
        getMovies: builder.query({
            query: value => `/?s=${value}&apikey=71f522f4`,
            providesTags: () => [{
                type: 'Movies'       //  тут этот ключ указываем для обновления кэша
            }]
        }),
        getMovieById: builder.query({
            query: id => `/?i=${id}&apikey=71f522f4`,
            providesTags: () => [{
                type: 'Movies'       //  тут этот ключ указываем для обновления кэша
            }]
        }),
    }),
})

export const {useGetMoviesQuery, useGetMovieByIdQuery} = apiGetMovies 