import { createContext, useState } from "react";
import { addMovie, removeMovie, setScore, getListMovieUser,verifyMovie, getScore } from "../api/UserMovie";

export const UserMovieContext = createContext();

export const UserMovieProvider = ({children}) => {

    {/* Context da api de UserMovie */}

    //rota para adicionar um filme ao user
    const addMovieToUser = async (movie_id, score) => {
        try{
            const response = await addMovie(movie_id, score);
            return response;
        } catch(error){
            return error
        }
    }
    //rota para remover um filme associado ao user
    const removeMoviefromUser = async (movie_id) => {
        try{
            const response = await removeMovie(movie_id);
            return response;
        } catch(error){
            return error
        }   
    }

    //rota para alterar o score de um filme
    const setMovieScore = async (movie_id, score) => {
        try{
            const response = await setScore(movie_id, score);
            return response
        } catch(error){
            return error
        }   
    }
    //rota para pegar a lista de filmes de um user
    const listMoviesFromUser = async () => {
        try{
            const movies = await getListMovieUser()
            return movies
        } catch(error){
            return error
        }
    }

    //rota para verificar se um filme está associado ao user
    const verifyMovieExists = async (movie_id) => {
        try{
            const response = await verifyMovie(movie_id)
            return response.status
        } catch(error){
            return error
        }
    }

    //rota para pegar o score de um filme
    const getMovieScore = async (movie_id) => {
        try{
            const response = await getScore(movie_id)
            return response.data
        } catch(error){
            return error
        }
    }


    return(
        <UserMovieContext.Provider value={{addMovieToUser, removeMoviefromUser, setMovieScore,listMoviesFromUser, verifyMovieExists, getMovieScore}}>
            {children}
        </UserMovieContext.Provider>
    )
}