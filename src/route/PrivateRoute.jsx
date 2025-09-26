import { Navigate } from "react-router-dom";

function PrivateRoutes({children, user}) {
    //caso o usuario nao esteja logado, ele sera redirecionado para a pagina de login
    return !user ? <Navigate to="/auth/login" replace /> : children
}

export default PrivateRoutes