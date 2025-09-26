import CardMovie from "../CardMovie";
import "./ListMovie.css";
import { useContext, useEffect } from "react";
import { UserMovieContext } from "../../context/UserMovieContext";
import { OMDBContext } from "../../context/OMDbContext";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CacheContext } from "../../context/CacheContext";

{/* Componente responsavel por listar os filmes do usuario */}
function ListMovie() {
    const {listMoviesFromUser, getMovieScore} = useContext(UserMovieContext)
    const {user} = useContext(AuthContext);
    const {setMovieCache, movies, addOrUpdateScore} = useContext(CacheContext);
    const {fetchMoviesByUserIds} = useContext(OMDBContext);

    
    useEffect(() => {
        const fetchMovies = async () => {
        //verifica se os filmes já estão presentes no localstorage para serem colocados nos states
        //Se nao, pega os filmes do backend e coloca no state.
            if(movies.data === undefined){
                //pega os ids dos filmes do usuario
                const listId = await listMoviesFromUser();
                const usersArray = listId.users;
                
                //pega os filmes, adiciona ao state movies
                // esses dados do state movies serao anexados no localstorge
                const movie = usersArray.map((id) => fetchMoviesByUserIds(id.movie_id));
                const responsesMovie = await Promise.all(movie);
                setMovieCache(responsesMovie);

                //pega os scores, adiciona ao state movieScore
                const responsesScore = usersArray.map((id) => getMovieScore(id.movie_id));
                const score = await Promise.all(responsesScore);
                score.map((s) => addOrUpdateScore(s.movie_id, s.score));
            }
        };
        fetchMovies();
    }, [user]);

    return(
        <div className="movie-list scrollbar-default scroll-area p-2">
            {movies.map((movie) => (
                <CardMovie key={movie.imdbID} movieId={movie.imdbID} moviePoster={movie.Poster} movieTitle={movie.Title} />
            ))}
        </div>
    );
}

export default ListMovie;