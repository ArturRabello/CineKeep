import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ChangePassword from "../pages/ChangePassword";
import PrivateRoutes from "./PrivateRoute";
import PublicRoutes from "./PublicRoutes";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function AppRoutes() {
    const { user } = useContext(AuthContext)
    return (
        <BrowserRouter>
            <Routes>
                {/*Rota Protegida*/}
                <Route path="/" element={<PrivateRoutes user={user}><Home/></PrivateRoutes>}/>
                {/* Rota Auth */}
                <Route path="/Auth" element={<AuthLayout/>}>
                    <Route path="register" element={<PublicRoutes user={user}><Register /></PublicRoutes>}/>
                    <Route path="login" element={<PublicRoutes user={user}><Login /></PublicRoutes>}/>
                    <Route path="changePassword" element={<PublicRoutes user={user}><ChangePassword /></PublicRoutes>}/>
                </Route>
            </Routes>
        </BrowserRouter>

    )
}

export default AppRoutes