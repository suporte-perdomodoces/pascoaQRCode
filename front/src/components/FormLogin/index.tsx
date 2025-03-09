import { useContext, useState } from "react"; 
import "./FormLogin.css";
import { AuthContext } from "../../Context/Auth/AuthContext";
import Button from "../Button";
import Input from "../Input";
import Label from "../Label";



export default function FormLogin() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const auth = useContext(AuthContext)

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!user || !password) {
            setError("Preencha todos os campos");
            return;
        }

        const res = auth.login(user, password);
        if (!res) {
            setError("Usuário ou senha inválidos");
            return;
        }


                
    };


    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <img src="/image/logoPblue.png" alt="Logo Perdomo" className="login-logo" />
                <div className="login-inputs">
                    <Label htmlFor="user" className="login-label">Usuário</Label>
                    <Input 
                    type="user" 
                    id="user" 
                    name="user" 
                    placeholder="" 
                    value={user}
                    r
                    onChange={handleUserChange} 
                    className="login-input" />
                    <Label htmlFor="password" className="login-label" >Senha</Label>
                    <Input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="" 
                    value={password}
                    r
                    onChange={handlePasswordChange} 
                    className="login-input" />
                </div>
                {error && <p className="error-message">{error}</p>}
                <Button type="submit" className="login-button" d={false} >Entrar</Button>
            </form>
        </div>
    )
}