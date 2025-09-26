{/*mapa de rotas da api de filmes*/}

const BASE_URL = import.meta.env.VITE_OMDB_URL;
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const OMBRRoutes = {
    SEARCH_MOVIE_FROM_QUERY: (query) => 
        `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`,
    SEARCH_MOVIE_FROM_ID: (id) => 
        `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(id)}`,


}

export default OMBRRoutes