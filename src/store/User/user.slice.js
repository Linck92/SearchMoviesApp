import { createSlice } from "@reduxjs/toolkit";
// import { getUserById } from "./user.actions";


export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        getUser: (state, action) => {
           return action.payload
        },
        toggleFavourites: (state, {payload: movie}) => {
            const index = state.favourites.findIndex(item => item.imdbID === movie.imdbID)

            if(index !== -1) {
                    state.favourites.splice(index, 1)
            } else {
                state.favourites.push(movie)
            }
        },
        getValue: (state, {payload: value}) => {
            state.inputValue = value;
        }
    },
})
export const {actions, reducer} = userSlice
1