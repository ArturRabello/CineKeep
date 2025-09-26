import { Navigate } from "react-router-dom";
    
function PublicRoutes({children, user}) {
    //Caso o usuário esteja logado, redireciona para a página inicial
    return user ? <Navigate to="/" replace /> : children
}

export default PublicRoutes