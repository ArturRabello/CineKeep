
import { useContext} from "react";
import { OMDBContext } from "../context/OMDbContext";
import { CacheContext } from "../context/CacheContext";
import StarRating from "./StarRating/StarRating";

{/* Card de filme */}
function CardMovie({movieId, moviePoster, movieTitle}){ 
    const {fetchMoviesByUserId} = useContext(OMDBContext)
    const {movieExistCache, addSelectedMovie, getMovieScore} = useContext(CacheContext);
    const score = getMovieScore(movieId);

    //função responsavel por selecionar o filme
    //se o filme nao estiver no cache, ele vai buscar o filme e adicionar ao cache
    const handlerSelectMovie = async (movieId) => {
        const movieExists = movieExistCache(movieId);
        console.log('movieExists', movieExists);
        if(!movieExists){
            const movieById = await fetchMoviesByUserId(movieId)
            console.log('movieById', movieById);
            addSelectedMovie(movieById);
        }else{
            addSelectedMovie(movieExists);
        };
    }

    return(
        <div onClick={() => {handlerSelectMovie(movieId)}} className="flex flex-col justify-center items-center gap-1 sm:w-[200px] sm:h-[360px] rounded-2xl hover:bg-zinc-800">
            <img src={moviePoster} alt="posterMatriz" className=" w-[280px] h-[380px] sm:w-[180px] sm:h-[280px] rounded-2xl"/>
            <h2 className=" truncate w-[180px] text-[32px] sm:text-[20px] text-center">{movieTitle}</h2>
            <StarRating defaultRating={score.score}  movie_id={movieId} tempRatingOff={true} />
        </div>
    )
}
export default CardMovie;