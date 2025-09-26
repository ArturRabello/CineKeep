
import { createContext, useEffect, useState } from "react"; 
import { login, getCurrentUser, logout, register, remove, updatePassword } from '../api/Auth';

{/* Context de api de Autenticação */}

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    //state que armazena os dados do usuario logado
    const [user, setUser] = useState(null);

    //useEffect que verifica se o usuario esta logado
    useEffect(() => {
        const fetchUser = async () => {
            try{
                const response = await getCurrentUser();
                if(response.status === 200) return setUser(response);
            } catch {
                setUser(null);
            }
        }
        fetchUser();
    },[])

    //Função responsavel por logar o usuario
    const loginUser = async (email, password) => {
        //realiza o login
        const responselogin = await login(email, password);
        if(responselogin.status !== 200){
            return responselogin.response.data;
        }
        //busca os dados do usuario
        const listUser = await getCurrentUser();
        if(listUser.status !== 200){
            return listUser.response.data;
        }
        //atualiza o state
        setUser(listUser);
        //retorna os dados
        return listUser;
    }

    //Função responsavel por deslogar o usuario
    const logoutUser = async () => {
        const response = await logout();
        setUser(null);
        console.log(response);
        return response
    }

    //Função responsavel por registrar o usuario
    const registerUser = async (userName, email, password, passwordConfirm) => {
        const responseRegister = await register(userName, email, password, passwordConfirm);
        console.log(responseRegister);
        if (responseRegister.status !== 201) {
            return responseRegister.response.data;
        }
        //busca os dados do usuario
        const responseLogin = await loginUser(email, password);
        if (responseLogin.status !== 200) {
            return responseLogin.response.data;
        }
        //busca os dados do usuario
        const responselistUser = await getCurrentUser();
        if (responselistUser.status !== 200) {
            return responselistUser.response.data;
        }
        //atualiza o state
        setUser(responselistUser);
        return responselistUser
    }
    
    //Função responsavel por alterar o password
    const updatePasswordUser = async (userName, email, newPassword) => {
        const response = await updatePassword(userName, email, newPassword);
        return response
    }

    //Função responsavel por remover o usuario
    const removeUser = async () => {
        const response = await remove();
        setUser(null);
        return response
    }

    return (
        <AuthContext.Provider value={{user, loginUser, logoutUser, registerUser, updatePasswordUser, removeUser}}>
            {children}
        </AuthContext.Provider>
    );
}