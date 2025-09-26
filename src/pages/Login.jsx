import Input from "../components/Input";
import Button from "../components/Button";
import OrDivider from "../components/OrDivide";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";

/* Pagina responsavel por logar o usuario */
function Login() {
    const {loginUser} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //função oresponsavel por verificar se o login foi feito com sucesso,
    //Se sim redireciona para a pagina principal
    const handlerLogin = async (email, password) => {
        const response = await loginUser(email, password);
        setErrors({});

        if(response.status === 200){
            return navigate('/');
        }else{
            setErrors({
                message: response.message
            })
        }
    }

    //funcao responsavel por redirecionar para a pagina de cadastro
    const handlerRegister = () => {
        return navigate('/auth/register');
    }
    //funcao responsavel por redirecionar para a pagina de troca de senha
    const handlerForgotPassword = () => {
        return navigate('/auth/ChangePassword');
    }

    return (
        <div className={`flex flex-col justify-center items-center gap-3`}>
            <Input id="email" type="text" title="Email" size="medium" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input id="password" type="password" title="Password" size="medium" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {errors && <p className="text-red-500 word-break-all w-[300px]">{errors.message}</p>}
            <Button title="Login" size="large" onClick={() => handlerLogin(email, password)} />
            <OrDivider />
            <Button title="Registrar" size="large" onClick={() => handlerRegister()} />
            <Button title="Forgot my password" size="large" onClick={() => handlerForgotPassword()} />
        </div>
    );
}

export default Login;