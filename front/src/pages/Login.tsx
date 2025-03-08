import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/Auth/AuthContext";
import Container from "../components/Container";
import FormLogin from "../components/FormLogin";


type Props = {
    props: {
        setIsLogged: (isLogged: boolean) => void;
    }
}

export default function Login({ props}: Props) {

    
    const auth = useContext(AuthContext)
    const setIsLogged = props.setIsLogged;

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        // verifica se já está logado e redireciona para a tela do vídeo se sim
        if (auth.user) setIsLogged(true);
        console.log("userLogged: ", auth.user)
        
    }, [])


    return (
        <Container className="container_01">
            <FormLogin props={{ setIsLogged }} />
        </Container>
    )
} 