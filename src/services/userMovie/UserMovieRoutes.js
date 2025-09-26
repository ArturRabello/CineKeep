{/*mapa de rotas da api de UserMovie*/}

const BASE_URL = import.meta.env.VITE_USER_MOVIE_URL;

const UserMovieRoutes = {
  ADD_MOVIE: `${BASE_URL}${import.meta.env.VITE_USER_MOVIE_ADD_MOVIE_ROUTE}`,
  REMOVE_MOVIE: `${BASE_URL}${import.meta.env.VITE_USER_MOVIE_REMOVE_MOVIE_ROUTE}`,
  SET_SCORE: `${BASE_URL}${import.meta.env.VITE_USER_MOVIE_SET_SCORE_ROUTE}`,
  GET_LIST: `${BASE_URL}${import.meta.env.VITE_USER_MOVIE_GET_LIST_ROUTE}`,
  VERIFY_MOVIE: `${BASE_URL}${import.meta.env.VITE_USER_MOVIE_GET_VERIFY_MOVIE_ROUTE}`,
  GET_SCORE: `${BASE_URL}${import.meta.env.VITE_USER_MOVIE_GET_SCORE_ROUTE}`,

};

export default UserMovieRoutes;
