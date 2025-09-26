{/*mapa de rotas da api de autenticacao*/}
const BASE_URL = import.meta.env.VITE_AUTH_URL;

const AuthRoutes = {
  LOGIN: `${BASE_URL}${import.meta.env.VITE_AUTH_LOGIN_ROUTE}`,
  REGISTER: `${BASE_URL}${import.meta.env.VITE_AUTH_REGISTER_ROUTE}`,
  GET_CURRENT_USER: `${BASE_URL}${import.meta.env.VITE_AUTH_GET_CURRENT_USER_ROUTE}`,
  DELETE_USER: `${BASE_URL}${import.meta.env.VITE_AUTH_DELETE_USER_ROUTE}`,
  UPDATE_PASSWORD: `${BASE_URL}${import.meta.env.VITE_UPDATE_PASSWORD_ROUTE}`,
  LOGOUT: `${BASE_URL}${import.meta.env.VITE_LOGOUT_ROUTE}`,
};

export default AuthRoutes;