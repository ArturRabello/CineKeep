
/*componente que mostra os resultados da pesquisa*/
function SearchResult({results, handlerselectMovie, hasSearched }){
    //caso algo tenha cido digitado no input, serão exibidos os resultados
    return(<div className="left-14 w-[280px] sm:w-[460px] sm:left-auto absolute mt-2 overflow-y-auto max-h-80 bg-white rounded-2xl ">  
        {hasSearched === true &&
            results.map((res) => (
                <div key={res.imdbID}>
                    <div onClick={() => {handlerselectMovie(res.imdbID) }} className="grid grid-cols-[80px_170px] sm:grid-cols-[120px_160px_112px_] gap-2 place-self-center place-items-center h-[90px] mt-1 hover:bg-zinc-300">
                        <img src={res.Poster} className="w-[60px] h-[80px]" />
                        <h1 className="truncate w-[150px] sm:w-[160px] text-zinc-600 justify-self-start">{res.Title}</h1>
                        <p className="text-zinc-600 justify-self-start hidden sm:block" >{res.Year}</p>
                    </div>
                    <div className="bg-zinc-400 sm:w-[420px] h-[1px] mx-auto my-1"></div>
                </div>
            ))}
        {/*caso nenhum filme tenha sido encontrado, será exibido uma mensagem*/}
        {(hasSearched === true && results.length === 0) && <p className="text-zinc-600 justify-self-center">{"Nenhum filme encontrado"}</p>}
    </div>);
}

export default SearchResult