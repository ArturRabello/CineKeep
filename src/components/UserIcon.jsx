import userIconSvg from "../assets/userIcon.svg"
import ConfirmModal from "../components/DropDowns/ConfirmModal";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CacheContext } from "../context/CacheContext";

/* Componente que representa o icone do usuario*/
function UserIcon(){
    const {logoutUser, removeUser} = useContext(AuthContext);
    const {clearCache} = useContext(CacheContext);

    const [isOpen, setIsOpen] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [showDropDownModal, setShowDropDownModal] = useState(false);

    const navigate = useNavigate();

    //Função oresponsavel por deslogar o usuario
    //Se o logout for feito com sucesso redireciona para a pagina de login
    const handlerLogout = async () => {
        const response = await logoutUser();
        if(response.status === 200){
            return navigate('/auth/login');
        }
    }

    //Função oresponsavel por remover o usuario
    //Se o usuario for removido da api redireciona para a pagina de login
    const handlerRemoveUser = async () => {
        const response = await removeUser();
        if(response.status === 200){
            return navigate('/auth/login');
        }
    }
    //useEffect que controla a visibilidade do dropdown
    useEffect(() => {
        let timer;
        if(isOpen){
            timer = setTimeout(() => 
                setShowDropDown(true), 100
            )
        }else{
            setShowDropDown(false)
            clearTimeout
        }

        return () => clearTimeout(timer);
    }, [isOpen])
    
    return (
        <>
        <div className="flex flex-col justify-center items-center h-[60px] "
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}>
            <img 
                src={userIconSvg}
                alt="userIcon"
                className={`
                    w-[40px]
                    h-[40px]
                    duration-200
                    ease-in-out 
                    ${isOpen && 'scale-110'} 
                `}/>
            {
                showDropDown && (
                    <div className="
                        top-[60px]
                        absolute
                        bg-zinc-300
                        w-[80px]
                        h-[60px]
                        flex
                        flex-col
                        justify-center
                        items-center
                        gap-1
                        rounded
                        ">
                        <p onClick={() => (handlerLogout(), clearCache())} 
                        className="w-[70px]
                            cursor-pointer
                             text-center
                            hover:bg-zinc-400 
                            hover:rounded-md"
                            >
                            Sair
                        </p>
                        {/*Exibe o modal de confirmação*/}
                        <p onClick={() => setShowDropDownModal(true)} 
                        className="w-[70px] 
                            cursor-pointer 
                            text-center
                          hover:bg-zinc-400 
                            hover:rounded-md"
                            >
                            Delete
                        </p>
                    </div>
                )
            }
        </div>
        {
            showDropDownModal && (
                <ConfirmModal 
                    open={showDropDownModal}
                    title="Do you want to delete your account?"
                    message="Do you want to Proceed ?"
                    confirmLabel="Confirm"
                    cancelLabel="Cancel"
                    onClose={() => setShowDropDownModal(false)}
                    onConfirm={() => handlerRemoveUser()}
                />
            )
        }
        </>
    );
}

export default UserIcon