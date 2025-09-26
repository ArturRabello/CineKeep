
import { UserMovieContext } from '../../context/UserMovieContext';
import { CacheContext } from '../../context/CacheContext';
import Button from '../Button';
import './StatusMovie.css'
import { useEffect, useContext, useState } from 'react';
import StarRating from '../StarRating/StarRating';

{/*Exibe as informações do filme selecionado*/}
function StatusMovie() {
    const {selectedMovie, RemoveMovieFromCache, AddMovieFromList, update, verifyMovieExistsFromCache, addOrUpdateScore, getMovieScore,  resetUpdated} = useContext(CacheContext);
    const {addMovieToUser, removeMoviefromUser, setMovieScore} = useContext(UserMovieContext);
    const [isListing, setIsListing] = useState(false);

    //função responsavel por remover filmes do localstorage e da api
    const handlerRemove = () => {
        removeMoviefromUser(selectedMovie.imdbID)
        RemoveMovieFromCache(selectedMovie.imdbID)
    }

    //função responsavel por adicionar filmes ao localstorage e a api
    const handlerAdd = () => {
        const score = getMovieScore(selectedMovie.imdbID)
        addMovieToUser(selectedMovie.imdbID, score.score)
        AddMovieFromList(selectedMovie)
    }

    //função responsavel por atualizar o rating
    const handlerRating = (movie_id, score) =>{
        addOrUpdateScore(movie_id, score)
        setMovieScore(movie_id, score)
        
    }
    //verifica se o filme ja foi listado
    //se nao, exibe o botao de adicionar 
    useEffect(() => {
        const checkMovie = async () => {
            if (selectedMovie) {
                const movieExists = await verifyMovieExistsFromCache(selectedMovie.imdbID);
                if (movieExists) {
                    setIsListing(true)
                } else {
                    setIsListing(false)
                }
            }
        };
        checkMovie();
        resetUpdated();


    }, [update, selectedMovie]);


    //exibe os detalhes do filme, se algum filme foi selecionado
    //se nao, exibe uma mensagem
    return (<div id={selectedMovie?.imdbID} className="grid grid-row-[200px_1fr_200px] max-h-[600px] scrollbar-default bg-[#121212e5] pt-2 rounded-2xl">
        {selectedMovie?.imdbID ? (
            <>
                <img src={selectedMovie.Poster} alt="poster" className="w-[180px] h-auto rounded-2xl justify-self-center" />
                <div className="flex-1 flex-col gap-x-2 text-center max-w-[200px] justify-self-center">
                    <h2 className="line -clamp-2 font-bold font-lato text-[18px] ">{selectedMovie.Title}</h2>
                    <StarRating  defaultRating={selectedMovie.imdbID} movie_id={selectedMovie.imdbID} size={32}  
                        onSetRating={(rating) => {handlerRating(selectedMovie.imdbID, rating)}}
                    />
                    {Object.entries(selectedMovie).map(([key, value]) => {
                        if(["Poster", "Title", "Website", "imdbID", "Response", "Production","imdbRating", "imdbVotes", "DVD", 'BoxOffice'].includes(key)) return null

                        if(key === "Ratings"){
                            return value.map((rating, index) => (
                                <p key={index} className='word-break-all'>
                                    <span className="font-bold font-lato text-[18px]">{rating.Source === "Internet Movie Database" ? "IMDb" : rating.Source}: </span> 
                                    {rating.Value}
                                </p>
                            ));
                        }

                        return(
                            <p key={key} className='word-break-all'>
                                <span className="font-bold font-lato text-[18px]">{key}: </span> 
                                {value}
                            </p>
                        );
                    })}
                    
                </div>
                <div className='flex items-center justify-center sticky bottom-0 h-[80px] bg-[#121212e5] '>
                    {isListing ?
                        <Button title="Remove" size="large" color="red" onClick={() => handlerRemove()} />
                    :
                        <Button title="TO ADD" size="large" color="red" onClick={() => handlerAdd()} />
                    } 
                </div>
            </>
        ):
        (
            <p className='text-zinc-600 justify-self-center'>{"Nenhum filme selecionado"}</p>
        )}
        
    </div>);
}

export default StatusMovie