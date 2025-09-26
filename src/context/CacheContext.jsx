import { createContext, useState, useEffect, useMemo} from "react";

export const CacheContext = createContext();

{/* Context de Cache */}
export const CacheProvider = ({ children }) => {
    const [update, setUpdated] = useState(false);
    //useState
    //Puxa do localStorage as informacoes
    const [movies, setMovies] = useState(() => {
        return JSON.parse(localStorage.getItem('movies')) || []
    });

    const [selectedMovie, setSelectedMovie] = useState(() => {
        try {
            const saved = localStorage.getItem('selectedMovie');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Erro ao ler selectedMovie do localStorage:", error);
            return [];
        }
    });

    const [selectedMovies, setSelectedMovies] = useState([() => {
        try {
            const saved = localStorage.getItem('selectedMovies');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Erro ao ler selectedMovies do localStorage:", error);
            return [];
        }
    }]);

    const [movieScore, setMovieScore] = useState(() =>{
        try{
            const saved = localStorage.getItem('score');
            return saved ? JSON.parse(saved) : [];
        } catch {
            console.error("Erro ao ler score do localStorage:", error);
            return [];
        }
    });

    // UseEffect
    // Salva as informacoes no localStorage toda vez que os states forem alteradas
    useEffect(() => {
        localStorage.setItem('movies', JSON.stringify(movies));
    }, [movies])

    useEffect(() => {
        localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie));
    }, [selectedMovie])

    useEffect(() => {
        localStorage.setItem('score', JSON.stringify(movieScore));
    }, [movieScore])

    // salva os filmes selecionados
    useEffect(() => {
        if (!selectedMovie) return; // se selectedMovie nao existir, nao faz nada
        // Verifica se o filme ja foi adicionado, caso nao, adiciona
        setSelectedMovies(prev => {
            const currentMovies = Array.isArray(prev) ? prev : [];
            const exists = currentMovies.some(movie => movie.imdbID === selectedMovie.imdbID);
            if (exists) return prev;
            const updated = [...currentMovies, selectedMovie];
            localStorage.setItem('selectedMovies', JSON.stringify(updated));
            return updated;
        });
    }, [selectedMovie]);


    // Funções 

    // Limpa o localStorage
    const clearCache = () => {
        localStorage.removeItem('selectedMovies');
        localStorage.removeItem('selectedMovie');
        localStorage.removeItem('movies');
        localStorage.removeItem('score');

        setSelectedMovies(null);
        setSelectedMovie([]);
        setMovies([]);
    }

    // remove o filme do state.
    // consequentimente do localStorage tambem.
    const RemoveMovieFromCache = (id) => {
        const updatedMovies = movies.filter((movies) => movies.imdbID !== id);
        setUpdated(true);
        setMovies(updatedMovies);
    }

    // adiciona o filme ao state
    // consequentimente ao localStorage
    const AddMovieFromList = (movie) => {
        setMovies((prevMovies) => [...prevMovies, movie]);
        setUpdated(true);
    }

    // verifica se o filme ja foi adicionado no cache
    // consequentemente ao localStorage
    const verifyMovieExistsFromCache = (id) => {
        const movieExists = movies.some((movie) => movie.imdbID === id);
        return movieExists
    }

    // verifica se o filme se o filme selecionado ja foi adicionado ao state selectedMovies
    // se nao, adiciona
    const movieExistCache = (selectedMovie) => {// garante que selectedMovie existe
        const movieExists = selectedMovies.find((movie) => movie.imdbID === selectedMovie);
        if (movieExists){
            setSelectedMovie(movieExists);
            return movieExists;
        }
        return null;
    }

    // adiciona o filme ao stateSelectedMovie
    const addSelectedMovie = (movie) => {
        setSelectedMovie(movie);

    }

    // adiciona o filme ao stateMovie
    const setMovieCache = (movies) => {
        setMovies(movies);
    }

    // adiciona ou atualiza o score do movieScore
    const addOrUpdateScore = (movie_id, score) => {
        setMovieScore((prev) => {
            const exists = prev.find((m) => m.movie_id === movie_id);
            if(exists){
                return prev.map((m) => 
                    m.movie_id === movie_id ? {...m, score} : m
                )
            }else{
                return [...prev, {movie_id, score}]
            }
        });
    }

    // remove o score do movieScore
    const removeScoreForCache = (movie_id) => {
        setMovieScore((prev) => {
            return prev.filter((m) => m.movie_id !== movie_id);
        });
    }

    // pega o movieScore do filme, caso não houver retorna 0
    const getMovieScore = (movie_id) => {
        const movieExists = movieScore.find((movie) => movie.movie_id === movie_id);
        if(!movieExists) return {score: 0};
        return movieExists
    }

    // resetar o updated
    const resetUpdated = () => setUpdated(false);

    const contextValue = useMemo(() => {
        return {
            update,
            setUpdated,
            movies,
            setMovies,
            selectedMovie,
            setSelectedMovie,
            selectedMovies,
            setSelectedMovies,
            clearCache,
            RemoveMovieFromCache,
            AddMovieFromList,
            verifyMovieExistsFromCache,
            resetUpdated,
            movieExistCache,
            setMovieCache,
            addSelectedMovie,
            addOrUpdateScore,
            movieScore,
            getMovieScore,
            removeScoreForCache

        }
    },[ update, movies, selectedMovie, selectedMovies,movieScore ]);

    return <CacheContext.Provider value={contextValue}>{children}</CacheContext.Provider>;
    
}