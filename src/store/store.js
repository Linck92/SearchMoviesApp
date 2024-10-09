import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiGetUsers } from "./API/APIgetUsers";
import {reducer} from './User/user.slice'
import { apiGetMovies } from "./API/APIgetMovies";

const reducers = combineReducers({
    user: reducer,
    [apiGetUsers.reducerPath]: apiGetUsers.reducer,
    [apiGetMovies.reducerPath]: apiGetMovies.reducer,

})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiGetUsers.middleware).concat(apiGetMovies.middleware)
})