import Input from "../Input"
import SearchResult from "./SearchResults";
import { OMDBContext} from "./../../context/OMDbContext";
import { CacheContext } from "../../context/CacheContext";
import { useState, useRef, useEffect, useContext} from "react";
    
/*Componente de input de pesquisa*/
function SearchContainer(){
    const {fetchMoviesByUserQuery, searchMovies, fetchMoviesByUserId} = useContext(OMDBContext);
    const {addSelectedMovie} = useContext(CacheContext);
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const ContainerRef = useRef(null);

    // A função handlerSelectMovie recebe o id do filme selecionado pelo usuário.
    // Esse id é usado pela função fetchMoviesByUserId, que retorna as informações do filme.
    // Essas informações são então passadas para a função addSelectedMovie, que adiciona o filme a um state.
    // Por fim, os dados armazenados nesse state também são salvos no localStorage.
    const handlerselectMovie = async (id) => {
        const movieById = await fetchMoviesByUserId(id);
        console.log('movieById', movieById);
        if(movieById === null) return;
        addSelectedMovie(movieById);
    }

    //Esse useEffect chama a função fetchMoviesByUserQuery quando a query mudar.
    //Toda vez que o usuario digita algo ao input, essa função chama o fetchMoviesByUserQuery
    // O resultado da pesquisa é armazenado no state searchMovies.
    //setHasSearched(true) indica que o usuario ja fez uma pesquisa.
    useEffect(() => {
        if(query.trim() === '') return;
        fetchMoviesByUserQuery(query);
        setHasSearched(true);
    }, [query]);

    // abre o menu de pesquisa.
    const handlerOpen = () => {
        setOpen(true);
    }

    // UseEffect responsavel por fechar o menu de pesquisa ao clicar fora 
    useEffect(() => {
        const handlerClickOutside = (event) => {
            if(ContainerRef.current && !ContainerRef.current.contains(event.target)){
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handlerClickOutside);
        return () => {
            document.removeEventListener('mousedown', handlerClickOutside);
        };
    },[]);

    return(<div className="p-4" onClick={handlerOpen} ref={ContainerRef}>
       <Input id="Search" type="Search" title="Search" size="small" color="white" value={query} onChange={(e) => setQuery(e.target.value)} className="sm:w-[460px] sm:h-[35px]"/>
       {open && <SearchResult results={searchMovies} handlerselectMovie={handlerselectMovie} hasSearched={hasSearched}/>}
    </div>);
}

export default SearchContainer