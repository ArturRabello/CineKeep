import Button from "../components/Button";
import Input from "../components/Input";
import OrDivider from "../components/OrDivide";
import {useNavigate} from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

/* Pagina responsavel por registrar o usuario */
function Register() {
    const {registerUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState({});


    //função responsavel por registrar o usuario.
    //Se o registro for feito com sucesso redireciona para a pagina principal.
    const handlerRegister = async (userName, email, password, passwordConfirm) => {
        setError({});
        const response = await registerUser(userName, email, password, passwordConfirm);
        if (response.status === 200) {
            return navigate('/');
        } else {
            setError({
                message: response.message
            })
        }
    }

    //funcao responsavel por redirecionar para a pagina de login
    const handlerEntrar = () => {
        return navigate('/auth/login');
    }

    return (
        <div className={`flex flex-col justify-center items-center gap-3`}>
            <Input id="name" type="text" title="Name" size="medium"  value={name} onChange={(e) => setName(e.target.value)}  />
            <Input id="email" type="text" title="Email" size="medium" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input id="password" type="password" title="Password" size="medium" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input id="passwordConfirm" type="password" title="PasswordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} size="medium" />
            <p className=" text-red-500 text-center word-break-all w-[300px]">{error.message}</p>
            <Button title="Registrar" size="large" color="red" onClick={() => handlerRegister(name, email, password, passwordConfirm)} />
            <OrDivider />
            <Button title="Entrar" size="large" onClick={() => handlerEntrar()}/>
        </div>
    );
}

export default Register;