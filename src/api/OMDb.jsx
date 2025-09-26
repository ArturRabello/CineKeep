import axios from "axios";
import OMDbRoutes from "../services/OMDb/OMDbRoutes.js";

{/* Rotas da api de filme*/}

//Rotas de consulta de filmes
export const searchMovieFromQuery = async (query) => {
    try {
        const response = await axios.get(OMDbRoutes.SEARCH_MOVIE_FROM_QUERY(query), {withCredentials: false});
        return response.data;
    } catch (error) {
        return response;
    }
}

//Rota para consultar um filme pelo id 
export const searchMovieFromId = async (id) => {
    try{
        const response = await axios.get(OMDbRoutes.SEARCH_MOVIE_FROM_ID(id), {withCredentials: false});
        return response.data;
    } catch{
        return reponse;
    }
}
