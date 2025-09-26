import axios from "axios";
import AuthRoutes from "../services/auth/AuthRoutes.js";

axios.defaults.withCredentials = true; 

{/* Rotas da api de autenticacao */}

//Rotas de Login
export const login = async (email, password) => {
  try{
    const response = await axios.post(AuthRoutes.LOGIN, { email, password });
    return response;
  
  } catch (error) {
    return error
  }
};

//Rotas de Registro
export const register = async (userName, email, password, passwordConfirm) => {
  try {
    const response = await axios.post(AuthRoutes.REGISTER, {userName, email, password, passwordConfirm});
    console.log(response);
    return response;
  } catch (error) {
    return error
  }
};

//Rotas de Update do password
export const updatePassword = async (userName, email, newPassword) => {
    try {
        const response = await axios.put(AuthRoutes.UPDATE_PASSWORD, {userName, email, newPassword });
        return response;
    } catch (error) {
        return error
    }
}

//Rotas de Delete do user
export const remove = async () => {
    try {
        const response = await axios.delete(AuthRoutes.DELETE_USER);
        console.log(response);
        return response;
    } catch (error) {
        return error
    }
}

//Rotas de Get User
export const getCurrentUser = async () => {
    try {
        const response = await axios.post(AuthRoutes.GET_CURRENT_USER);
        return response;
    } catch (error) {
        return error
    }
}

//Rotas de Logout
export const logout = async () => {
    try{
        const response = await axios.post(AuthRoutes.LOGOUT);
        return response;
    } catch (error) {
        return error
    }
}

