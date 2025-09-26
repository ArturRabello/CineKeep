/*Componente que representa um botão */
function Button({title, onClick, color = "red", size, rounded = true, }) {
    
    //Objetos que armazenam as classes de tamanhos
    const sizeClasses = {
        small: 'w-[95px] h-[35px]',
        medium: 'w-[120px] h-[35px]',
        large: 'w-[260px] h-[35px]',
    }

    //Objetos que armazenam as classes de cores
    const colorClasses = {
        red: 'bg-red-900 hover:bg-red-800 text-white ',
        black: 'bg-black hover:bg-gray-700 text-white',
        gray: 'bg-gray-900 hover:bg-gray-700 text-white',
        green: 'bg-green-900 hover:bg-green-700 text-white',

    }

    return (
        <div>
            <button onClick={onClick ? onClick : () => {}}  
                className={`
                        ${colorClasses[color]}
                        ${sizeClasses[size]}
                        ${rounded ? 'rounded-[6px]' : ''}
                    `}>
                    {title}
            </button>
        </div>
    );
}

export default Button