import { createContext, useState, useMemo} from "react";
import { searchMovieFromQuery, searchMovieFromId } from "../api/OMDb";

export const OMDBContext = createContext();
{/* Context de api de filme*/}
export const OMDBProvider = ({children}) => {
    const [searchMovies, setSearchMovies] = useState([]);

    // rota que retorna os filmes de acordo com a query
    const fetchMoviesByUserQuery = async (query) => {
        try{
            const response = await searchMovieFromQuery(query);
            console.log("response", response);
            setSearchMovies(response.Search.slice(0, 10));
            
        } catch(error) {
            return error
        }
    }

    // rota que retorna o filmes de acordo com o id
    const fetchMoviesByUserId = async (id) => {
        try{
            const response = await searchMovieFromId(id);
            return response
        }catch(error){
            return error
        }
    }

    // rota que retorna os filmes de acordo com o ids
    const fetchMoviesByUserIds = async (id) => {
        try{
            const response = await searchMovieFromId(id);
            return response
        } catch(error) {
            return error
        }
    }

    const contextValue = useMemo(() => {
        return {
            searchMovies,
            fetchMoviesByUserQuery,
            fetchMoviesByUserId,
            fetchMoviesByUserIds,
        };
    }, [searchMovies]);

   
    return (
        <OMDBContext.Provider value={contextValue}>{children}</OMDBContext.Provider>
    )
}