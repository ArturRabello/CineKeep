import { Star } from './Star.jsx'
import { useState, useEffect, useContext } from "react";

import { CacheContext } from '../../context/CacheContext.jsx';

{/* estrelas de avaliação */}
export default function StarRating({
    maxRatting = 5,
    color = "#fcc419",
    size = 24,
    clasName="",
    defaultRating = 0,
    onSetRating,
    movie_id,
    tempRatingOff = false

}) {
    const {selectedMovie, getMovieScore, movieScore} = useContext(CacheContext);
    const  [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(0);

    //verifica se o filme já foi avaliado
    //renderiza toda vez que um filme é selecionado e rating é alterado
    useEffect(() => {
        if(selectedMovie){
           const score = getMovieScore(movie_id);
            setRating(score.score)
        }
    },[selectedMovie, movieScore]);

    //função responsavel por atualizar o rating
    const handlerRating = (rating) => {
        onSetRating(rating);
    }
    return(
        <div className="flex justify-center items-center gap-[16px] py-2">
            <div className="flex">
                {/*cria um array com o numero de estrelas*/}
                {Array.from({length: maxRatting}, (_, i) =>(
                    <Star
                        key={i}
                        /* indica se a estrela deve ser preenchida*/
                        full={!tempRatingOff ? (tempRating ? tempRating >= i + 1 : rating >= i + 1) : rating >= i + 1}
                        /*caso seja selecionado, atualiza o rating*/
                        onRated={() => handlerRating(i + 1)}
                        /*
                            Atualiza o estado tempRating para (i+1)
                            Isso faz todas as estrelas até essa posição ficarem preenchidas (efeito de pré-visualização)
                        */
                        onHoverIn={() => !tempRatingOff && setTempRating(i + 1)}
                        /*
                            Reseta o tempRating para 0
                            Assim, volta a mostrar apenas as estrelas do rating salvo definitivamente
                        */
                        onHoverOut={() => !tempRatingOff && setTempRating(0)}
                        color={color}
                        size={size}
                    />
                ))}
            </div>
        </div>
    )
}