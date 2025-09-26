/*Componente que representa um input*/
function Input({ type, title = "", size, rounded = true, id, color = 'zinc', value = "", onChange = () => { }, ...props }) {

    //Objeto que armazena as classes de tamanho do input
    const BaseSizeClasses = {
        small: 'w-[90px] h-[35px]',
        medium: 'w-[260px] h-[35px]',
        large: 'w-[460px] h-[35px]',
    }

    //Objeto que armazena as classes de cores do input
    const ColorsClasses = {
        zinc: 'bg-zinc-500',
        white: 'bg-white',
    }

    return (
        <>
            <input
                id={id}
                type={type}
                placeholder={title}
                onChange={(e) => onChange(e)}
                value={value}
                className={` 
                ${ColorsClasses[color]}
                ${BaseSizeClasses[size]}
                ${rounded ? 'rounded-[6px]' : ''}
                focus:outline-none
                pl-3
                ${props.className}
            `}
            />
        </>
    );
}

export default Input;