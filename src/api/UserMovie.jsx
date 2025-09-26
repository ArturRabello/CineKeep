import axios from "axios";
import UserMovieRoutes from "../services/userMovie/UserMovieRoutes.js";

{/* Rotas da api de UserMovie */}

// Rota para associar um filme e seu score a um user
export const addMovie = async (movie_id, score) => {
    try{
        const response = await axios.post(UserMovieRoutes.ADD_MOVIE, {movie_id, score}, {withCredentials: true});
        return response.data;
    } catch (error) {
        return error.response
    }
}

// Rota para remover um filme de um user
export const removeMovie = async (movie_id) => {
    try{
        const response = await axios.delete(UserMovieRoutes.REMOVE_MOVIE,
             {params: {movie_id}, 
             withCredentials: true});
        return response.data;
    } catch (error) {
        return error.response
    }
}

// Rota para alterar o score de um filme
export const setScore = async (movie_id, score) => {
    try{
        const response = await axios.put(UserMovieRoutes.SET_SCORE, {movie_id, score}, {withCredentials: true});
        
        return response.data;
    } catch (error) {
        return error.response
    }
}

// Rota para pegar a lista de filmes de um user
export const getListMovieUser = async () => {
    try{
        const response = await axios.get(UserMovieRoutes.GET_LIST, {withCredentials: true});
        
        return response.data;
    } catch (error) {
        return error.response
    }
}

// Rota para verificar se um filme já está associado ao user
export const verifyMovie = async (movie_id) => {
    try{
        console.log(movie_id);
        const response = await axios.get(UserMovieRoutes.VERIFY_MOVIE, {
            params: { movie_id },
            withCredentials: true
        });
        return response;
    } catch (error) {
        return error.response
    }
}

// Rota para pegar o score de um filme
export const getScore = async (movie_id) => {
    try{
        const response = await axios.get(UserMovieRoutes.GET_SCORE, {
            params: { movie_id },
            withCredentials: true
        });
        return response;
    } catch (error) {
        return error.response
    }
}