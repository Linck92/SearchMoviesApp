import axios from "axios";


export const MovieService = {

    async getAll(value) {
        const response = await axios.get(`http://www.omdbapi.com/?s=${value}&apikey=71f522f4`);
        return response.data
    },

    async getById(id) {
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=71f522f4`);
        return response.data
    },

    async addUser(data) {
        return axios.post('http://localhost:3000/users', {...data, favourites: [], inputValue: ''})
    },

    async getUsers() {
        const response = await axios.get('http://localhost:3000/users')
        return response.data
    },

    async setInputValueOfUser(data) {
        const {value, user } = data
        return axios.put(`http://localhost:3000/users/${user.id}`, { ...user, inputValue: value})
    },

    async setFavouritesOfUser(user) {
        const updatedFavourites = [...user.favourites]
        return axios.put(`http://localhost:3000/users/${user.id}`, { ...user, favourites: updatedFavourites})
    }

}

