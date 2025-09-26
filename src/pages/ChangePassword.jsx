import Button from "../components/Button"
import Input from "../components/Input"
import OrDivide from "../components/OrDivide"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"

/* função responsavel por alterar o password do usuario */
function ChangePassword() {
    const navigate = useNavigate();
    const { updatePasswordUser } = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState({});

    //funcao responsavel por alterar o password.
    //Se o password for alterado com sucesso redireciona para a pagina de login
    const handlerForgotPassword = async (userName, Email, NewPassword) => {
        const response = await updatePasswordUser(userName, Email, NewPassword);
        if (response.status === 200) {
            return navigate('/auth/login');
        }
        return setError({
            message: response.message
        })
    }

    //funcao responsavel por redirecionar para a pagina de login
    const handlerLogin = () => {
        return navigate('/auth/login');
    }

    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <Input title="UserName" size="medium" type="text" id="UserName" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <Input title="Email" size="medium" type="text" id="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input title="NewPassword" size="medium" type="password" id="NewPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <Button title="Change Password" size="large" onClick={() => handlerForgotPassword(userName, email, newPassword)} />
            {error.message && <p className="text-red-500 word-break-all w-[300px]">{error.message}</p>}
            <OrDivide />
            <Button title="Login" size="large" onClick={() => handlerLogin()} />
        </div>
    )
}

export default ChangePassword