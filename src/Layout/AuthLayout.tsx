import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

/* Componete de layout para as paginas realcionadas a autenticacao*/ 
function AuthLayout() {
    return (
        <div className={`flex flex-col justify-center items-center h-screen`}>
            <div className={`flex flex-col items-center gap-5 `}>
                <Logo />
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout